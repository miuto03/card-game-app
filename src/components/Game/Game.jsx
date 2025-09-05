import React, { useState, useCallback } from 'react';
import { Box } from '@mui/material';
import PlayerZoneContainer from '../PlayerZone/PlayerZoneContainer';
import EnemyZone from '../EnemyZone';

const Game = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [enemyLife, setEnemyLife] = useState(10);
  const [enemyField, setEnemyField] = useState([
    { id: 'e1', name: 'Enemy Monster 1', power: 5 },
    { id: 'e2', name: 'Enemy Monster 2', power: 3 },
  ]);

  // カード選択ハンドラーを定義
  const handleCardSelect = useCallback((card) => {
    console.log('Game: カード選択:', card);
    setSelectedCard(card);
  }, []);

  // デバッグ用
  console.log('Game: handleCardSelect is:', typeof handleCardSelect);

  // 攻撃対象選択ハンドラー
  const handleTargetSelect = useCallback((target) => {
    console.log('Game handleTargetSelect:', { selectedCard, target });
    if (!selectedCard) {
      console.error('No card selected for attack');
      return;
    }

    if (target === 'enemy') {
      if (enemyField.length === 0) {
        setEnemyLife(prev => Math.max(0, prev - selectedCard.power));
        alert(`敵プレイヤーに${selectedCard.power}のダメージ！`);
      } else {
        alert('フィールドにモンスターがいる場合、直接攻撃はできません！');
        return;
      }
    } else {
      if (selectedCard.power >= target.power) {
        setEnemyField(prev => prev.filter(card => card.id !== target.id));
        alert(`${target.name}を倒しました！`);
      } else {
        alert(`攻撃力が足りません！ (${selectedCard.power} vs ${target.power})`);
        return;
      }
    }

    setSelectedCard(null);
  }, [selectedCard, enemyField]);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', p: 2 }}>
      <EnemyZone 
        life={enemyLife}
        field={enemyField}
        selectedCard={selectedCard}
        onSelectTarget={handleTargetSelect}
      />
      <PlayerZoneContainer
        initialLife={10}
        opponentField={enemyField}
        selectedCard={selectedCard}
        onCardSelect={handleCardSelect}  // 関数を渡す
      />
    </Box>
  );
};

export default Game; 