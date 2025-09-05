import React from 'react';
import PlayerZone from './PlayerZone';
import { useGameStore } from '../../stores/index.js';

const PlayerZoneContainer = () => {
  const { 
    playerLife,
    playerField,
    playerHand,
    playerDeck,
    selectedCard,
    attackedMonsters,
    setSelectedCard,
    summonCard,
    currentPhase
  } = useGameStore();

  return (
    <PlayerZone
      life={playerLife}
      field={playerField}
      hand={playerHand}
      deck={playerDeck}
      selectedCard={selectedCard}
      onCardSelect={setSelectedCard}
      onSummon={summonCard}
      attackedMonsters={attackedMonsters}
      currentPhase={currentPhase}
    />
  );
};

export default PlayerZoneContainer;
