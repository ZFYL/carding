import Vuex from "vuex";
import { gameStore } from "./game.js";

export const store = new Vuex.Store({
  modules: {
    gameStore,
  },
});
