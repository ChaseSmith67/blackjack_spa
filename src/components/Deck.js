const numberOfDecks = 1; // Easily change number of decks


class Card {
    /** 
    * Represents a single playing card.
    */
    constructor(value, suit, image, visible = true) {
        /**
         * @param {string} value - String representation of the value of the card.
         * @param {string} suit - String representation of the card's suit.
         * @param {string} image - The file path to the card's image.
         * @param {boolean} visible - Whether the card is face-up or not.
         */
        this.value = value;
        this.suit = suit;
        this.image = image;
        this.visible = visible;
    }
}


/** 
 *  Build the deck by looping through the suits and values
 *  and creating a new Card object and pushing it to the deck
 *  array. The cards are then shuffled and the deck is returned.
 */
const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];

for (let i = 0; i < numberOfDecks; i++) {
    for (let suit of suits) {
        for (let value of values) {
            deck.push(new Card(value, suit, "images/" + suit + "/" + value + ".png"));
        }
    }
}

/**
 *  Fisher-Yates algorithm to randomly shuffle cards.
 */  
const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

export function createDeck() {return shuffleArray(deck);}

