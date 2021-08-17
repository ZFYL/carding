import { DeckOfCards } from "../services/DeckOfCards.js";

export const game = {
  methods: {
    finalizeGameSession() {
      let currentLeaderboard = [];
      if (
        typeof localStorage.leaderboard !== "undefined" &&
        localStorage.leaderboard !== ""
      ) {
        currentLeaderboard = JSON.parse(localStorage.leaderboard);
      }
      currentLeaderboard.push({ ...this.currentProgress });
      clearTimeout(this.timeoutKiller);
      localStorage.leaderboard = JSON.stringify(currentLeaderboard);
    },
    youWon() {
      this.finalizeGameSession();

      this.$store.commit("gameStore/goToWelcome", {
        dialog: true,
        finalResult: this.currentProgress,
        status: "win",
      });
    },
    gameOver() {
      this.finalizeGameSession();

      this.$store.commit("gameStore/goToWelcome", {
        dialog: true,
        finalResult: this.currentProgress,
        status: "lose",
      });
    },

    cardChecker(event, suit) {
      if (event.added) {
        if ({ ...event.added.element }.cards[0].suit !== suit) {
          this.gameOver();
        } else {
          this.resetTimer();
        }
      }
    },
    
    checkIfSpades(event) {
      this.cardChecker(event, "SPADES");
    },
    checkIfHearts(event) {
      this.cardChecker(event, "HEARTS");
    },
    checkIfClubs(event) {
      this.cardChecker(event, "CLUBS");
    },
    checkIfDiamonds(event) {
      this.cardChecker(event, "DIAMONDS");
    },
    getNewCard() {
      this.loading = true;
      if ({ ...this.$store.state.gameStore }.deckId ?? false) {
        DeckOfCards.getCard({ ...this.$store.state.gameStore }.deckId).then(
          (card) => {
            this.cardsRemaining = card.remaining;
            this.loading = false;
            this.currentCard = [card];
          }
        );
      } else {
        DeckOfCards.getDeck().then((deck) => {
          this.$store.commit("gameStore/saveDeck", deck);
          DeckOfCards.getCard(deck.deck_id).then((card) => {
            this.loading = false;
            this.cardsRemaining = card.remaining;
            this.currentCard = [card];
          });
        });
      }
    },
    currentCardChange(event) {
      if (event.removed) {
        this.getNewCard();
      }
    },
    resetTimer() {
      this.currentProgress.timeSpent += 5 - this.timer;
      this.currentProgress.counter += 1;

      if (
        this.currentProgress.counter >= this.$store.state.gameStore.counterToWin
      ) {
        this.currentProgress.win = true;
        this.youWon();
      }

      this.timer = 5;
    },

    countDownTimer() {
      if (this.timer <= 0) {
        this.gameOver();
      }
      if (this.timer > 0) {
        this.timeoutKiller = setTimeout(() => {
          this.timer = (this.timer - 0.02).toFixed(2);
          this.countDownTimer();
        }, 20);
      }
    },

    startTimer() {
      if (this.startingCountdown <= 0) {
        this.countDownTimer();
      }
      if (this.startingCountdown > 0) {
        setTimeout(() => {
          this.startingCountdown = this.startingCountdown - 1;
          this.startTimer();
        }, 1000);
      }
    },
  },
};

export default game;
