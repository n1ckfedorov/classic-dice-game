'use client';

import { Button } from '@/components';
import { Icon } from '@/components/Sprite';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useDiceStore } from '@/store/dice';

export const GameActions = () => {
  const { isSoundMuted, toggleSound, isMovieMode, toggleMovieMode } = useDiceStore();

  return (
    <div className="@container relative z-100 flex h-12 w-full justify-between rounded-b-xl border-t border-third bg-layer3 px-1 lg:static lg:justify-self-end lg:px-5">
      <div className="flex flex-1 items-center lg:gap-2">
        <Button aria-label="Stars" variant="input" size="s" className="border-none bg-transparent px-2 py-0 text-secondary" type="button">
          <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full bg-transparent">
            <Icon name="star-big" className="size-6" />
          </div>
          <span className="hidden @2xl:block">398</span>
        </Button>
        <Button aria-label="Likes" variant="input" size="s" className="border-none bg-transparent px-2 py-0 text-secondary" type="button">
          <div className="relative flex size-8 cursor-pointer items-center justify-center rounded-full bg-transparent">
            <Icon name="like" className="mt-0.5 size-6" />
          </div>
          <span className="hidden @2xl:block">407</span>
        </Button>
        <Button target="_blank" href="https://t.me/n1ck_dev" aria-label="Telegram" variant="input" size="s" className="border-none bg-transparent px-2 py-0 text-secondary">
          <Icon name="tg" className="size-6" />
        </Button>
      </div>
      <div className="hidden @2xl:block"></div>
      <div className="flex flex-1 items-center justify-end md:gap-2">

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleMovieMode}
              variant="input"
              size="s"
              className={cn('hidden border-none bg-transparent px-2 py-0 lg:flex', isMovieMode ? 'text-brand' : 'text-secondary')}
              type="button"
              aria-label="Toggle movie mode"
            >
              <Icon name="movie" className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle movie mode</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="Toggle sound" onClick={toggleSound} variant="input" size="s" className={cn('border-none bg-transparent px-2 py-0', !isSoundMuted ? 'text-brand' : 'text-secondary')} type="button">
              <Icon name={isSoundMuted ? 'sound' : 'sound-on'} className="size-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle sound</p>
          </TooltipContent>
        </Tooltip>

      </div>
    </div>
  );
};
