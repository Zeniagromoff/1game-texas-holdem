'use strict'

let Card = require('./card');

let suit = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
let rank = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];

let deck = [];
for (let i = 0; i < suit.length; ++i) {
    for (let j = 0; j < rank.length; ++j) {
        deck.push(new Card(suit[i], rank[j]));
    }
}

module.exports = {
    Suit: suit,
    Rank: rank,
    Deck: deck,
};