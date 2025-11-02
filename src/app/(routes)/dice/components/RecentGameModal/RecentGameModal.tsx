'use client';

import type { GameResult } from '@/types/dice/game-result.types';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/Sprite';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';

type RecentGameModalProps = {
  onCloseAction: () => void;
  selectedGameResult: GameResult;
};

type GameContentProps = {
  onCloseAction: () => void;
  selectedGameResult: GameResult;
};

const GameContent = ({ onCloseAction, selectedGameResult }: GameContentProps) => {
  const { data } = selectedGameResult;
  const [isGameDetailOpen, setIsGameDetailOpen] = useState(false);

  const handleCopyBetId = async () => {
    const betId = data.bet_id;
    try {
      await navigator.clipboard.writeText(betId);
      toast.success('Bet ID copied to clipboard');
    } catch {
      toast.error('Failed to copy Bet ID');
    }
  };

  const toggleGameDetail = () => {
    setIsGameDetailOpen(!isGameDetailOpen);
  };

  return (
    <div className="scrollbar max-h-[60vh] overflow-y-auto sm:max-h-[70vh]">
      <div
        className="relative mx-4 mb-4 rounded-xl bg-layer4 text-xs sm:mt-4"
        style={{
          backgroundImage: 'url("/assets/images/gradient.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center top',
          backgroundSize: 'contain',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <div className="p-3 pt-4 pb-0">
          <div className="text-center text-base leading-5 text-primary sm:text-sm">Profit</div>
          <div className="flex items-center justify-center">
            <div className="mr-1.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full  leading-6">
              <Image src="/assets/images/UAH.webp" alt="UAH" width={16} height={16} />
            </div>
            <div className="flex items-center text-2xl">
              <span className="text-[1.75rem] leading-10 font-extrabold text-primary">
                UAH&nbsp;
                {data.win}
              </span>
            </div>
          </div>
          <div className="mb-2 text-center text-base text-white">
            UAH&nbsp;
            {data.balance}
          </div>
        </div>
        <div className=" mx-3 flex justify-between rounded-xl bg-black/10 py-3">
          <div className="flex w-1/2 flex-col items-center text-sm sm:text-xs">
            <span className="whitespace-nowrap text-secondary">Bet Amount</span>
            <div className="flex items-center">
              <span className="text-base text-white sm:text-sm">
                UAH&nbsp;
                {data.bet_amount}
              </span>
            </div>
          </div>
          <div className="flex w-1/2 flex-col items-center text-sm sm:text-xs">
            <span className="text-secondary">Payout</span>
            <span className="text-base leading-6 text-white sm:text-sm">
              {data.multiplier}
              x
            </span>
          </div>
        </div>
        <div className="relative flex h-8 items-center px-4">
          <div className="absolute -left-3 -rotate-45 rounded-full border-8 border-layer2 border-t-transparent border-l-transparent"></div>
          <div className="h-0 w-full border-b border-dashed border-secondary opacity-20"></div>
          <div className="absolute -right-3 rotate-[135deg] rounded-full border-8 border-layer2 border-t-transparent border-l-transparent"></div>
        </div>
        <div className="flex px-5">
          <Image className="rounded-full" src="/assets/images/avatar.png" alt="Avatar" width={44} height={44} />
          <div className="ml-3 flex flex-col justify-around text-sm sm:text-xs">
            <div>
              <span className="text-secondary">User</span>
              <span className="ml-1 text-secondary">On 11/2/2025, 7:07:57 AM</span>
            </div>
            <div className="flex items-center">
              <span className="whitespace-nowrap text-secondary">Bet ID:</span>
              <div className="ml-1 flex items-center text-primary">
                <span className="mr-1">
                  <Icon name="garant" className="size-4 text-[#24EE89]" />
                </span>
                {data.bet_id}
                <button
                  type="button"
                  onClick={handleCopyBetId}
                  className="ml-1 cursor-pointer transition-opacity hover:opacity-70"
                  aria-label="Copy Bet ID"
                >
                  <Icon name="copy" className="h-4 w-4 text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-3 mt-4 mb-4 flex items-center justify-between rounded-xl bg-layer5 px-4 py-3">
          <div className="flex">
            <Image className="mr-2 rounded" src="/assets/images/game.avif" alt="Game" width={40} height={56} />
            <div className="my-1 flex flex-col justify-around">
              <div className="text-sm font-extrabold text-primary">Classic Dice</div>
              <div className="text-sm text-secondary sm:text-xs">Original Game</div>
            </div>
          </div>
          <div className="flex cursor-pointer items-center text-base text-gray-400 text-secondary sm:text-xs">
            <button type="button" onClick={onCloseAction} className="text-primary">Play Now</button>
            <Icon name="arrow-right" className="h-7 w-7 -rotate-180" />
          </div>
        </div>
        <div className="mx-3 mt-2  px-3 py-1 pb-4 text-sm">
          <button
            type="button"
            onClick={toggleGameDetail}
            className="flex w-full items-center justify-between py-1 text-sm transition-opacity hover:opacity-80"
          >
            <span className="text-sm font-extrabold text-primary">Game Detail</span>
            <motion.svg
              viewBox="0 0 32 32"
              width="32"
              height="32"
              fill="none"
              className="h-7 w-7  text-primary"
              animate={{ rotate: isGameDetailOpen ? -90 : 180 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <path stroke="currentColor" strokeWidth="2.4" d="M18.4 11.2 13.6 16l4.8 4.8"></path>
            </motion.svg>
          </button>
          <AnimatePresence initial={false}>
            {isGameDetailOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="overflow-hidden">
                  <div className="rounded-xl">
                    <div className="mt-2.5 flex justify-between rounded-xl bg-layer3 py-4 dark:bg-layer5">
                      {/* Result */}
                      <div className="mr-1.5 flex h-10 flex-1 flex-col items-center justify-center border-r border-third text-secondary">
                        <div className="flex h-5 items-center justify-center text-sm sm:text-xs">
                          <Icon name="stats" className="mr-2 w-4 text-[#24EE89]" />

                          Result
                        </div>
                        <div className="mt-2 flex h-4 items-center justify-center text-base font-semibold whitespace-nowrap text-primary sm:text-sm">
                          {data.roll}
                        </div>
                      </div>
                      {/* Bet */}
                      <div className="mr-1.5 flex h-10 flex-1 flex-col items-center justify-center border-r border-third text-secondary">
                        <div className="flex h-5 items-center justify-center text-sm sm:text-xs">
                          <Icon name="bet" className="mr-2 w-4 text-[#0f62fe]" />
                          Bet
                        </div>
                        <div className="mt-2 flex h-4 items-center justify-center text-base font-semibold whitespace-nowrap sm:text-sm">
                          <span className="mthan text-primary">
                            {data.direction === 'under' ? '<50' : '>50'}
                          </span>
                        </div>
                      </div>
                      {/* Chance */}
                      <div className="flex h-10 flex-1 flex-col items-center justify-center text-secondary">
                        <div className="flex h-5 items-center justify-center text-sm sm:text-xs">
                          <Icon name="chance" className="mr-2 w-4 text-[#ed6300]" />
                          Chance
                        </div>
                        <div className="mt-2 flex h-4 items-center justify-center text-base font-semibold whitespace-nowrap text-primary sm:text-sm">
                          {data.target_percent}
                          {' '}
                          %
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* Server Seed */}
                      <div role="group" className="mt-4">
                        <span
                          className="px-1 text-sm leading-4 font-semibold text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-40 data-[invalid]:text-secondary"
                        >
                          Server Seed
                        </span>
                        <div className="input mt-2 h-10 text-base font-semibold sm:text-sm" data-disabled="true">
                          <input disabled value={data.server_seed} />
                        </div>
                      </div>
                      {/* Server Seed (hash) */}
                      <div role="group" className="mt-4">
                        <span
                          className="flex justify-between px-1 text-sm leading-4 font-semibold text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-40 data-[invalid]:text-secondary"
                        >
                          <span>Server Seed (hash)</span>
                          <button className="cl-primary" type="button">Seed Settings</button>
                        </span>
                        <div className="input mt-2 h-10 text-base font-semibold sm:text-sm" data-disabled="true">
                          <input disabled value={data.next_hashed_server_seed} />
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2 pb-4">
                        {/* Client Seed */}
                        <div role="group" className="flex-1 text-base">
                          <span
                            className="px-1 text-sm leading-4 font-semibold text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-40 data-[invalid]:text-secondary"
                          >
                            Client Seed
                          </span>
                          <div className="input mt-2 h-10 text-base sm:text-sm" data-disabled="true">
                            <input disabled value={data.client_seed} />
                          </div>
                        </div>
                        {/* Nonce */}
                        <div role="group" className="flex-1 text-base">
                          <span
                            className="px-1 text-sm leading-4 font-semibold text-secondary peer-disabled:cursor-not-allowed peer-disabled:opacity-40 data-[invalid]:text-secondary"
                          >
                            nonce
                          </span>
                          <div className="input mt-2 h-10 text-base sm:text-sm" data-disabled="true">
                            <input disabled inputMode="decimal" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      <Button className="mb-2.5 h-10 w-full" type="button">
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export function RecentGameModal({ onCloseAction, selectedGameResult }: RecentGameModalProps) {
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return (
      <Dialog open={true} onOpenChange={() => onCloseAction()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="rounded-t-xl bg-layer2 sm:bg-layer4">
            <DialogTitle>Bet Slip</DialogTitle>
            <DialogDescription className="sr-only">
              Game details
            </DialogDescription>
          </DialogHeader>
          <GameContent onCloseAction={onCloseAction} selectedGameResult={selectedGameResult} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={true} onOpenChange={() => onCloseAction()}>
      <DrawerContent>
        <DrawerHeader className="rounded-t-xl bg-layer2 sm:bg-layer4">
          <DrawerTitle>Bet Slip</DrawerTitle>
          <DrawerDescription className="sr-only">
            Game details
          </DrawerDescription>
        </DrawerHeader>
        <GameContent onCloseAction={onCloseAction} selectedGameResult={selectedGameResult} />
      </DrawerContent>
    </Drawer>
  );
}
