import React, { useState } from "react";

const Deck = () => {
const BASE_URL = "https://deckofcardsapi.com/api/deck/";

async function newDeck() {
    let url = BASE_URL + "new";
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
}

}

export default Deck;
