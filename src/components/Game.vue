<template>
  <div class="game">
    <h1>Carding</h1>

    <div class="center">
      <div
        v-if="!startingCountdown"
        class="clickBlocker"
      />

      <button @click="toWelcome()">
        To Welcome
      </button>
      <button
        :disabled="loading"
        @click="getNewCard()"
      >
        Get another card
      </button>
    </div>

    <h1>{{ timer }}</h1>
    <h1>Cards left in the deck: {{ cardsRemaining }}</h1>
    <br>

    <h2>Drawn card:</h2>
    <Dropzone
      id="oneCard"
      :list="currentCard"
      @fireCheck="currentCardChange"
    />

    <br>

    <h2>Place the drawn card here:</h2>
    <table class="dropzoneTable">
      <tbody>
        <tr>
          <td class="cardDropzone">
            <Dropzone
              id="spades"
              :list="spades"
              @fireCheck="checkIfSpades"
            />
          </td>
          <td class="cardDropzone">
            <Dropzone
              id="hearts"
              :list="hearts"
              @fireCheck="checkIfHearts"
            />
          </td>
        </tr>
        <tr>
          <td class="cardDropzone">
            <Dropzone
              id="diamonds"
              :list="diamonds"
              @fireCheck="checkIfDiamonds"
            />
          </td>
          <td class="cardDropzone">
            <Dropzone
              id="clubs"
              :list="clubs"
              @fireCheck="checkIfClubs"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <br>
    <br>
  </div>
</template>

<script>

import Dropzone from "./Dropzone.vue";
import game from "../mixins/game.js";

export default {
  name: "Game",
  components: {
    Dropzone,
  },
  mixins: [game],
  data() {
    return {
      currentCard: [
        {
          cards: [
            {
              image: "test",
            },
          ],
        },
      ],
      spades: [],
      diamonds: [],
      clubs: [],
      hearts: [],
      drag: false,
      timer: 5,
      loading: false,
      timerInterval: {},
      cardsRemaining: 52,
      currentProgress: {
        timeSpent: 0,
        counter: 0,
        win: false,
      },
      timeoutKiller: "",
      startingCountdown: 3,
    };
  },
  created() {
    this.getNewCard();

    this.countDownTimer();
    // this.startTimer();
  },
  methods: {
    log() {
      console.log("clubs", this.clubs);
      console.log("diamonds", this.diamonds);
      console.log("hearts", this.hearts);
      console.log("spades", this.spades);
    },
    toWelcome() {
      clearTimeout(this.timeoutKiller);
      return this.$store.commit("gameStore/goToWelcome");
    },
  },
};
</script>

<style>
.cardDropzone {
  min-height: 150px;
}
.cardDropzone.spades {
  background: rgb(100, 220, 20);
}
.cardDropzone.hearts {
  background: crimson;
}
.cardDropzone.clubs {
  background: rgb(15, 15, 15);
}
.cardDropzone.diamonds {
  background: rgb(20, 173, 220);
}
.cardDropzone.oneCard {
  background: grey;
}
.dropzoneTable td {
  width: auto;
}
td.cardDropzone {
  width: 50%;
  position: relative;
}
.cardDropzone {
  width: 100%;
}
.dropzoneTable {
  width: 100%;
}
.singleCard {
  height: 150px;
}
div#spades:before {
  content: "♠";
  display: block;
  font-size: 100px;
  /* padding: 20px; */
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}
div#hearts:before {
  content: "♥";
  display: block;
  font-size: 100px;
  /* padding: 20px; */
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}
div#clubs:before {
  content: "♣";
  display: block;
  color: rgb(124, 124, 124);
  font-size: 100px;
  /* padding: 20px; */
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}
div#diamonds:before {
  content: "♦";
  display: block;
  font-size: 100px;
  /* padding: 20px; */
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
}

.cardDropzone .singleCard {
  position: absolute;
  left: calc(50% - 53px);
}

button {
  border: none;
  background: linear-gradient(106deg, #3c81cf, #2bd4a9);
  border-radius: 20px;
  font-size: 20px;
  padding: 20px;
  margin: 5px;
  transition: 0.2s ease-in-out;
}

button:active {
  background: linear-gradient(106deg, #2d6099, #20a382);
}

* {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

h1 {
  text-align: center;
}

.center {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
}
</style>
