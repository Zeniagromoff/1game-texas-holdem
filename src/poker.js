'use strict'

let Card = require('./card');

let suit = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
let name = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

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