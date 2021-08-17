<template>
  <div>
    <WelcomeScreen v-if="welcomeScreen" />
    <Game v-if="!welcomeScreen" />
  </div>
</template>

<script>
import WelcomeScreen from "./components/WelcomeScreen.vue";
import Game from "./components/Game.vue";

export default {
  name: "App",
  components: {
    WelcomeScreen,
    Game,
  },
  computed: {
    welcomeScreen() {
      // return this.$store.gameStore.welcomeScreen
      console.log("welcomeScreen:", this.$store.state.gameStore.welcomeScreen);
      return this.$store.state.gameStore.welcomeScreen;
    },
  },
};
</script>
