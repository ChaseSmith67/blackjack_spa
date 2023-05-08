
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
        deck.push(new Card(value, suit, "./images" + suit + "/" + value + ".png"));
    }
}

