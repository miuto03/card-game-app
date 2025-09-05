// フェーズの定義
export const PHASES = {
  DRAW: 'DRAW',
  MAIN1: 'MAIN1',
  BATTLE: 'BATTLE',
  MAIN2: 'MAIN2',
  END: 'END'
};

// フェーズ名の日本語マッピング
export const PHASE_NAMES = {
  [PHASES.DRAW]: 'ドローフェーズ',
  [PHASES.MAIN1]: 'メインフェーズ 1',
  [PHASES.BATTLE]: 'バトルフェーズ',
  [PHASES.MAIN2]: 'メインフェーズ 2',
  [PHASES.END]: 'エンドフェーズ'
}; 