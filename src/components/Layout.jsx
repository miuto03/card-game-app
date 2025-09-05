import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import PlayerZoneContainer from './PlayerZone';
import EnemyZone from './EnemyZone';
import ActionButtons from './ActionButtons';
import { useGameStore } from '../stores/index.js';
import { PHASES, PHASE_NAMES } from '../stores/constants';

const Layout = () => {
  const { 
    enemyLife,
    enemyField,
    selectedCard,
    attack,
    endTurn,
    drawCard,
    currentPhase,
    mana,
    maxMana,
    startTurn,
    nextPhase,
    hasDrawnThisTurn
  } = useGameStore();

  useEffect(() => {
    startTurn();
  }, [startTurn]);

  const handleDraw = () => {
    console.log("Drawing card...");
    drawCard();
  };

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>
      <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
        現在のフェーズ: {PHASE_NAMES[currentPhase]}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
        マナ: {mana}/{maxMana}
      </Typography>

      <EnemyZone 
        life={enemyLife} 
        field={enemyField}
        selectedCard={selectedCard}
        onSelectTarget={attack}
      />
      <ActionButtons 
        onDraw={handleDraw}
        onEndTurn={endTurn}
        nextPhase={nextPhase}
        currentPhase={currentPhase}
        hasDrawnThisTurn={hasDrawnThisTurn}
      />
      <PlayerZoneContainer />
    </Box>
  );
};

export default Layout;
