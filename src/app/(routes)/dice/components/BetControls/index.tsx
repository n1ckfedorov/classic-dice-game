'use client';

import { useDiceGame } from '@/hooks/useDiceGame';
import { BalanceDisplay } from './BalanceDisplay';
import { BetInput } from './BetInput';
import { ErrorMessage } from './ErrorMessage';
import { useBetHandlers } from './handlers';
import { RollButton } from './RollButton';
import { Tabs } from './Tabs';
import { WinAmountDisplay } from './WinAmountDisplay';

export const BetControls = () => {
  const {
    balance,
    gameConfig,
    handlePlaceBet,
    isRolling,
    targetPercent,
    direction,
    setBetAmount,
  } = useDiceGame();

  const {
    betAmountInput,
    error,
    activeTab,
    potentialWin,
    currentBetAmount,
    setActiveTab,
    handleAmountChange,
    handleQuickBet,
    handleQuickBetMultiplier,
    handleMaxBet,
    sliderMax,
    handleSliderChange,
    handlePlaceBetClick,
  } = useBetHandlers({
    gameConfig,
    balance,
    targetPercent,
    direction,
    handlePlaceBet,
    setBetAmount,
  });

  if (!gameConfig) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-sm text-muted-foreground">Loading game config...</p>
      </div>
    );
  }

  return (
    <div className="order-2 col-span-full flex flex-col gap-3 rounded-t-none border-r border-input border-layer5 bg-layer4 pt-1 lg:relative lg:order-none lg:col-span-1 lg:h-full lg:overflow-y-auto lg:rounded-tl-xl lg:pt-0.5">

      <Tabs activeTab={activeTab} onTabChangeAction={setActiveTab} />
      <div className="flex flex-col px-3 pt-2">

        {/* Amount Input */}
        <div className="flex flex-col gap-2">

          <BetInput
            value={betAmountInput}
            onChangeAction={handleAmountChange}
            disabled={isRolling}
            onQuickBetAction={handleQuickBet}
            onQuickBetMultiplierAction={handleQuickBetMultiplier}
            onMaxBetAction={handleMaxBet}
            balance={balance}
            maxBet={gameConfig.max_bet}
            sliderValue={currentBetAmount}
            sliderMin={gameConfig.min_bet}
            sliderMax={sliderMax}
            onSliderChangeAction={handleSliderChange}
          />

        </div>

        <WinAmountDisplay value={potentialWin} />

        <RollButton
          onClickAction={handlePlaceBetClick}
          disabled={isRolling}
          betAmount={currentBetAmount}
          balance={balance}
        />

        <ErrorMessage message={error} />

        <BalanceDisplay balance={balance} />
      </div>
    </div>
  );
};
