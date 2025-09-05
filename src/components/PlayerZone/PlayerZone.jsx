import React from "react";
import { Box, Grid, Typography, Card, CardContent, Button, Fade } from "@mui/material";
import { PHASES } from '../../stores/constants';

const PlayerZone = ({
  life,
  field,
  hand,
  deck,
  selectedCard,
  onCardSelect,
  onSummon,
  attackedMonsters = new Set(),
  currentPhase,
  graveyard
}) => {
  const isMainPhase = currentPhase === PHASES.MAIN1 || currentPhase === PHASES.MAIN2;
  const isBattlePhase = currentPhase === PHASES.BATTLE;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6">❤ プレイヤーライフ: {life}</Typography>
      <Typography variant="h6">📂 デッキ: {deck?.length || 0}枚</Typography>

      {/* 手札ゾーン */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">👋 手札ゾーン</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {hand?.map((card) => (
            <Card key={card.id}>
              <CardContent>
                <Typography>{card.name}</Typography>
                <Typography>Power: {card.power}</Typography>
                <Typography>Mana Cost: {card.manaCost}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onSummon(card)}
                  disabled={!isMainPhase}
                >
                  召喚
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* 召喚ゾーン */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">🎮 召喚ゾーン</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {field?.map((card) => {
            const isAttacked = attackedMonsters.has(card.id);
            return (
              <Card key={card.id}>
                <CardContent>
                  <Typography>{card.name}</Typography>
                  <Typography>Power: {card.power}</Typography>
                  <Button
                    variant="contained"
                    color={selectedCard?.id === card.id ? "warning" : "primary"}
                    onClick={() => onCardSelect(card)}
                    disabled={isAttacked || !isBattlePhase}
                    sx={{
                      opacity: isAttacked ? 0.5 : 1,
                    }}
                  >
                    {isAttacked 
                      ? "攻撃済み" 
                      : selectedCard?.id === card.id 
                        ? "選択解除" 
                        : !isBattlePhase
                          ? "バトルフェーズのみ"
                          : "攻撃に選択"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      </Box>

      {/* 墓地ゾーン */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">🪦 墓地ゾーン</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {graveyard?.map((card) => (
            <Fade in={true} key={card.id}>
              <Card>
                <CardContent>
                  <Typography>{card.name}</Typography>
                  <Typography>Power: {card.power}</Typography>
                  <Typography>Mana Cost: {card.manaCost}</Typography>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PlayerZone;
