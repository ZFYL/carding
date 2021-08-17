import axios from "axios";

export const DeckOfCards = {
  getDeck,
  getCard,
};

function getDeck() {
  return axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((response) => {
      return response.data;
    });
}

function getCard(deck) {
  return axios
    .get("https://deckofcardsapi.com/api/deck/" + deck + "/draw/?count=1")
    .then((response) => {
      return response.data;
    });
}
