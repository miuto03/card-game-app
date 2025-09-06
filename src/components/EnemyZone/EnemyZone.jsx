import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

// 消滅エフェクトのアニメーション定義
const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
`;

// ダメージエフェクトのアニメーション定義
const damageAnimation = keyframes`
  0% {
    background-color: inherit;
  }
  50% {
    background-color: #ff000033;
  }
  100% {
    background-color: inherit;
  }
`;

const EnemyZone = ({ 
  life = 10,
  field = [],
  selectedCard,
  onSelectTarget,
  graveyard = []
}) => {
  const [animatingCards, setAnimatingCards] = useState(new Set());
  const [damageEffects, setDamageEffects] = useState(new Set());

  const handleClick = (target) => {
    if (!selectedCard || typeof onSelectTarget !== 'function') return;

    if (target === 'enemy') {
      onSelectTarget(target);
      return;
    }

    // ダメージエフェクトを表示
    setDamageEffects(prev => new Set([...prev, target.id]));

    // カードが倒される場合
    if (target.power <= selectedCard.power) {
      setAnimatingCards(prev => new Set([...prev, target.id]));
      
      // アニメーション後にカードを削除
      setTimeout(() => {
        onSelectTarget(target);
        setAnimatingCards(prev => {
          const next = new Set(prev);
          next.delete(target.id);
          return next;
        });
      }, 500); // アニメーション時間に合わせる
    } else {
      onSelectTarget(target);
    }

    // ダメージエフェクトをリセット
    setTimeout(() => {
      setDamageEffects(prev => {
        const next = new Set(prev);
        next.delete(target.id);
        return next;
      });
    }, 300);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box 
        sx={{ 
          padding: 2, 
          border: '1px solid #ccc',
          borderRadius: 2,
          marginBottom: 2,
          cursor: selectedCard ? 'pointer' : 'default',
          '&:hover': selectedCard ? {
            backgroundColor: '#f5f5f5'
          } : {}
        }}
        onClick={() => selectedCard && handleClick('enemy')}
      >
        <Typography variant="h6">Enemy Life: {life}</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        {field.map((card) => (
          <Fade key={card.id} in={!animatingCards.has(card.id)}>
            <Card 
              sx={{ 
                cursor: selectedCard ? 'pointer' : 'default',
                opacity: selectedCard ? 1 : 0.7,
                '&:hover': selectedCard ? {
                  backgroundColor: '#f5f5f5'
                } : {},
                animation: damageEffects.has(card.id) 
                  ? `${damageAnimation} 0.3s ease-in-out`
                  : 'none',
                ...(animatingCards.has(card.id) && {
                  animation: `${fadeOutAnimation} 0.5s ease-in-out`,
                }),
              }}
              onClick={() => handleClick(card)}
            >
              <CardContent>
                <Typography>{card.name}</Typography>
                <Typography>Power: {card.power}</Typography>
              </CardContent>
            </Card>
          </Fade>
        ))}
      </Box>

      {/* 墓地ゾーン */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">🪦 敵の墓地ゾーン</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {graveyard?.map((card) => (
            <Card key={card.id}>
              <CardContent>
                <Typography>{card.name}</Typography>
                <Typography>Power: {card.power}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default EnemyZone; 