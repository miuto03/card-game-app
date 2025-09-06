import { create } from 'zustand';
import { PHASES, PHASE_NAMES } from '../constants';

// 初期カードの定義
const initialCards = [
  { id: '1', name: 'Attack', power: 10, manaCost: 1 },
  { id: '2', name: 'Heal', power: 5, manaCost: 1 },
  { id: '3', name: 'Defense', power: 7, manaCost: 1 },
  { id: '4', name: 'Special Attack', power: 15, manaCost: 1 },
  { id: '5', name: 'Draw Spell', power: 0, manaCost: 1 },
];

// 初期デッキの定義
const initialDeck = [
  { id: 'd1', name: 'Attack', power: 10, manaCost: 1 },
  { id: 'd2', name: 'Heal', power: 5, manaCost: 1 },
  { id: 'd3', name: 'Defense', power: 7, manaCost: 1 },
  { id: 'd4', name: 'Special Attack', power: 15, manaCost: 1 },
  { id: 'd5', name: 'Draw Spell', power: 0, manaCost: 1 }, // スペルカードを追加
  { id: 'd6', name: 'Magic Shield', power: 0, manaCost: 2 },
  { id: 'd7', name: 'Fireball', power: 12, manaCost: 3 },
  { id: 'd8', name: 'Ice Blast', power: 8, manaCost: 2 },
];

// 初期状態の定義
const initialState = {
  enemyLife: 10,
  playerLife: 10,
  enemyField: [
    { id: 'e1', name: 'Attack', power: 10 },
    { id: 'e2', name: 'Heal', power: 5 },
    { id: 'e3', name: 'Defense', power: 7 }
  ],
  playerField: [],
  playerHand: initialCards,
  playerDeck: initialDeck,
  selectedCard: null,
  attackedMonsters: new Set(),
  hasDrawnThisTurn: false,
  currentPhase: PHASES.DRAW,
  mana: 0,
  maxMana: 10,
  showAlert: false,
  alertMessage: '',
  playerGraveyard: [], // 墓地を追加
  enemyGraveyard: [], // 敵の墓地を追加
};

const useGameStore = create((set) => ({
  ...initialState,
  startTurn: () => set((state) => ({
    ...state,
    mana: Math.min(state.mana + 1, state.maxMana),  // Increment mana
    showAlert: true,
    alertMessage: 'ターンが開始されました。マナが回復しました。',
    currentPhase: PHASES.DRAW,  // Set phase to DRAW
  })),
  // ドロー機能
  drawCard: () => set((state) => {
    if (state.currentPhase !== PHASES.DRAW) {
      return {
        ...state,
        showAlert: true,
        alertMessage: 'ドローフェーズでのみドローできます！'
      };
    }
  
    if (state.hasDrawnThisTurn) {
      return {
        ...state,
        showAlert: true,
        alertMessage: 'このターンは既にドローしています！'
      };
    }
  
    // Draw a card logic here
    const [drawnCard, ...remainingDeck] = state.playerDeck;
    return {
      ...state,
      playerDeck: remainingDeck,
      playerHand: [...state.playerHand, drawnCard],
      hasDrawnThisTurn: true,  // Set this to true after drawing
      showAlert: true,
      alertMessage: 'カードをドローしました。'
    };
  }),
  nextPhase: () => set((state) => {
    const phaseOrder = [PHASES.DRAW, PHASES.MAIN1, PHASES.BATTLE, PHASES.MAIN2, PHASES.END];
    const currentIndex = phaseOrder.indexOf(state.currentPhase);
    const nextPhase = phaseOrder[(currentIndex + 1) % phaseOrder.length];

    console.log("次のフェーズ:", nextPhase);

    return {
      ...state,
      currentPhase: nextPhase,
      hasDrawnThisTurn: false,
      showAlert: true,
      alertMessage: `${PHASE_NAMES[nextPhase]}に移行しました。`
    };
  }),
  // 召喚機能を追加
  summonCard: (card) => set((state) => {
    console.log("Current Hand:", state.playerHand);
    console.log("Attempting to summon:", card);

    if (state.mana < card.manaCost) {
      return {
        ...state,
        showAlert: true,
        alertMessage: 'マナが足りません！'
      };
    }

    if (card.name === "Draw Spell") {
      // スペルカードの効果: 2枚ドロー
      const [firstCard, secondCard, ...remainingDeck] = state.playerDeck;
      return {
        ...state,
        playerHand: [...state.playerHand, firstCard, secondCard],
        playerDeck: remainingDeck,
        mana: state.mana - card.manaCost,
        showAlert: true,
        alertMessage: '2枚のカードをドローしました。',
        playerGraveyard: [...state.playerGraveyard, card] // Move to graveyard
      };
    }

    if (state.playerHand.includes(card)) {
      const newField = [...state.playerField, card];
      const newHand = state.playerHand.filter(c => c !== card);
      
      console.log("New Field:", newField);
      console.log("New Hand:", newHand);

      return {
        ...state,
        playerField: newField,
        playerHand: newHand,
        mana: state.mana - card.manaCost,
        showAlert: true,
        alertMessage: `${card.name}を召喚しました。`,
        playerGraveyard: [...state.playerGraveyard, card] // Move to graveyard
      };
    }

    return state; // Return current state if the card is not in hand
  }),

  // カード選択
  setSelectedCard: (card) => set({ selectedCard: card }),

  // 攻撃
  attack: (target) => set((state) => {
    if (!state.selectedCard) return state;

    console.log("Selected Card:", state.selectedCard);
    console.log("Enemy Life before attack:", state.enemyLife);

    if (state.attackedMonsters.has(state.selectedCard.id)) {
      return {
        ...state,
        showAlert: true,
        alertMessage: `${state.selectedCard.name}は既に攻撃済みです！`,
        selectedCard: null
      };
    }

    if (target === 'enemy') {
      const newLife = Math.max(0, state.enemyLife - state.selectedCard.power);
      console.log("Enemy Life after attack:", newLife);

      return {
        ...state,
        enemyLife: newLife,
        attackedMonsters: new Set([...state.attackedMonsters, state.selectedCard.id]),
        selectedCard: null,
        playerGraveyard: [...state.playerGraveyard, state.selectedCard] // Move to player graveyard
      };
    }

    const newField = state.enemyField.map(card => {
      if (card.id === target.id) {
        const remainingPower = card.power - state.selectedCard.power;
        if (remainingPower <= 0) {
          // Both cards go to graveyard if power is equal or less
          return null;
        }
        return { ...card, power: remainingPower };
      }
      return card;
    }).filter(Boolean);

    return {
      ...state,
      enemyField: newField,
      attackedMonsters: new Set([...state.attackedMonsters, state.selectedCard.id]),
      selectedCard: null,
      playerGraveyard: [...state.playerGraveyard, state.selectedCard], // Move player card to graveyard
      enemyGraveyard: [...state.enemyGraveyard, target] // Move enemy card to graveyard
    };
  }),

  // ターン終了
  endTurn: () => set((state) => ({ 
    ...state,
    attackedMonsters: new Set() 
  })),

  // アラートを閉じる
  closeAlert: () => set((state) => ({ 
    ...state,
    showAlert: false 
  })),

}));

export default useGameStore;
