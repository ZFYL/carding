export const gameStore = {
  namespaced: true,
  state: {
    welcomeScreen: true,
    deckId: null,
    gameWon: false,
    counterToWin: 10,
    gameLeaderboard: {},
    modal: {
      dialog: false,
      message: "",
      finalResult: {},
      status: "",
    },
    currentGame: {
      counter: 0,
      timer: 0.0,
      cardsPlaced: {
        spades: [],
        hearts: [],
        clubs: [],
        diamonds: [],
      },
    },
  },
  mutations: {
    goToGame: (state) => {
      state.deckId = null;
      state.welcomeScreen = false;
    },
    goToWelcome: (state, payload) => {
      state.welcomeScreen = true;
      state.modal = payload;
      
    },
    saveDeck: (state, deck) => {
      state.deckId = deck.deck_id;
    },
    closeDialog: (state) => {
        state.modal.dialog = false;
    }
  },
};
