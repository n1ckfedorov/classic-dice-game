'use client';

type TabType = 'manual' | 'auto' | 'advanced';

type TabsProps = {
  activeTab: TabType;
  onTabChangeAction: (tab: TabType) => void;
};

export function Tabs({ activeTab, onTabChangeAction }: TabsProps) {
  return (
    <div className="border-border flex gap-1 border-b border-layer5">
      <button
        type="button"
        aria-label="Manual"
        onClick={() => onTabChangeAction('manual')}
        className={`relative px-3 pb-2.5 text-sm font-medium transition-colors ${
          activeTab === 'manual'
            ? 'text-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-secondary'
            : 'text-muted-foreground hover:text-primary'
        }`}
      >
        Manual
      </button>
      <button
        type="button"
        onClick={() => onTabChangeAction('auto')}
        aria-label="Auto"
        className={`relative px-3 pb-2.5 text-sm font-medium transition-colors ${
          activeTab === 'auto'
            ? 'text-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-secondary'
            : 'text-muted-foreground hover:text-primary'
        }`}
      >
        Auto
      </button>
      <button
        type="button"
        onClick={() => onTabChangeAction('advanced')}
        aria-label="Advanced"
        className={`relative px-3 pb-2.5 text-sm font-medium transition-colors ${
          activeTab === 'advanced'
            ? 'text-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-secondary'
            : 'text-muted-foreground hover:text-primary'
        }`}
      >
        Advanced
        <span className="ml-1 text-xs text-brand-secondary">✨</span>
      </button>
    </div>
  );
}
