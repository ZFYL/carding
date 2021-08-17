<template>
  <div class="welcome">
    <h1>
      Welcome to Carding!
    </h1>

    <div class="center">
      <button @click="toGame()">
        Start Carding
      </button>
    </div>

    <Leaderboard />

    <Modal
      v-if="dialog.dialog"
      :dialog="dialog"
      @tryAgain="toGame()"
    />
  </div>
</template>

<script>
import Leaderboard from './Leaderboard.vue';
import Modal from "./Modal";

export default {
  name: "WelcomeScreen",
  components: { Modal, Leaderboard },
  computed: {
    dialog() {
      let dialogData = this.$store.state.gameStore.modal;
      return dialogData ?? {dialog: false}
    },
  },
  methods: {
    toGame() {
      return this.$store.commit("gameStore/goToGame");
    },
    closeDialog() {
      console.log("try again")
      this.$store.commit("gameStore/closeDialog");
    },
  },
};
</script>

<style>

</style>
