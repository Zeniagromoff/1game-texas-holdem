'use strict'

let Card = function (suit, name) {
    this.suit = suit;
    this.name = name;
};

let suit = ['Heart', 'Spade', 'Club', 'Diamond'];
let name = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];

let deck = [];
for (let i = 0; i < suit.length; ++i) {
    for (let j = 0; j < name.length; ++j) {
        deck.push(new Card(suit[i], name[j]));
    }
}

module.exports = {
    Suit: suit,
    Name: name,
    Deck: deck,
};