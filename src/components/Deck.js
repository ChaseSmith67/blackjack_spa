
class Card {
    constructor(value, suit, image, visible = true) {
        this.value = value;
        this.suit = suit;
        this.image = image;
        this.visible = visible;
    }
}

const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];

for (let suit of suits) {
    for (let value of values) {
        deck.push(new Card(value, suit, "images/" + suit + "/" + value + ".png"));
    }
}

// Fisher-Yates algorithm to shuffle the deck
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

