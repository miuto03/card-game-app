// src/components/ActionButtons.jsx
import React from "react";
import { Box, Button } from "@mui/material";
import { PHASES } from '../../stores/constants';

const ActionButtons = ({ onDraw, onEndTurn, nextPhase, currentPhase, hasDrawnThisTurn }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Button 
        onClick={onDraw} 
        variant="contained" 
        color="secondary"
        sx={{ minWidth: '100px' }}
      >
        ドロー
      </Button>
      <Button 
        onClick={onEndTurn} 
        variant="contained" 
        color="warning"
        sx={{ minWidth: '100px' }}
      >
        ターン終了
      </Button>
      <Button 
        onClick={nextPhase} 
        variant="contained" 
        color="primary"
        disabled={currentPhase === PHASES.DRAW && !hasDrawnThisTurn}
        sx={{ minWidth: '100px' }}
      >
        次のフェーズへ
      </Button>
    </Box>
  );
};

export default ActionButtons;
