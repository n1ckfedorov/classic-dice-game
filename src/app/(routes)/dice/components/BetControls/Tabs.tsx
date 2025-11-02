'use client';

import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Sprite';
import { cn } from '@/lib/utils';

type TabType = 'manual' | 'auto' | 'advanced';

type TabsProps = {
  activeTab: TabType;
  onTabChangeAction: (tab: TabType) => void;
};

const tabs: { id: TabType; label: string; isNew?: boolean; disabled?: boolean }[] = [
  { id: 'manual', label: 'Manual', disabled: false },
  { id: 'auto', label: 'Auto', disabled: true },
  { id: 'advanced', label: 'Advanced', isNew: true, disabled: true },
];

type TabPosition = {
  left: number;
  width: number;
};

export function Tabs({ activeTab, onTabChangeAction }: TabsProps) {
  const tabRefs = useRef<Record<TabType, HTMLButtonElement | null>>({
    manual: null,
    auto: null,
    advanced: null,
  });
  const [activeTabPosition, setActiveTabPosition] = useState<TabPosition>({
    left: 0,
    width: 0,
  });

  useLayoutEffect(() => {
    const calculatePosition = (): TabPosition | null => {
      const button = tabRefs.current[activeTab];
      if (!button) {
        return null;
      }
      const container = button.parentElement;
      if (!container) {
        return null;
      }
      const containerRect = container.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      return {
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      };
    };

    const updatePosition = () => {
      const position = calculatePosition();
      if (position) {
        requestAnimationFrame(() => {
          setActiveTabPosition(position);
        });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [activeTab]);

  return (
    <div className="relative flex  items-center justify-between border-b border-layer5 will-change-auto">
      {tabs.map(tab => (
        <motion.button
          key={tab.id}
          ref={(el) => {
            tabRefs.current[tab.id] = el;
          }}
          type="button"
          aria-label={tab.label}
          onClick={() => {
            onTabChangeAction(tab.id);
          }}
          disabled={tab.disabled}
          className={cn('relative flex-1 z-10 h-12 px-3 text-sm overflow-hidden font-extrabold transition-colors', activeTab === tab.id
            ? 'text-primary'
            : 'text-muted-foreground', tab.disabled && 'cursor-not-allowed opacity-50')}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          {tab.label}
          {tab.isNew && (
            <div className="absolute top-0 -right-2 z-1000 flex h-3.5 w-12 items-center justify-center">
              <Icon name="mark" className="absolute top-0 left-0 size-4 h-[13px] w-[39px] text-[#E5DF4F] opacity-20" />
              <span className="-mt-0.5 -ml-1 text-[0.625rem] text-[#E5DF4F]">New</span>
              <Icon name="star" className="size-2.5 text-[#E5DF4F]" />
            </div>
          )}
        </motion.button>
      ))}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#24ee89] to-[#9fe871]"
        initial={false}
        animate={{
          left: activeTabPosition.left,
          width: activeTabPosition.width,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      />
    </div>
  );
}
