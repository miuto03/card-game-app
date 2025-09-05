import React from 'react';
import { useGameStore } from '../stores/index.js';

const PlayerZoneContainer = () => {
  const { playerHand, summonCard } = useGameStore();

  return (
    <div>
      {playerHand.map(card => (
        <button key={card.id} onClick={() => summonCard(card)}>
          {card.name}を召喚
        </button>
      ))}
    </div>
  );
};

export default PlayerZoneContainer; 