'use strict'

let Card = function (suit, rank) {
    this.suit = suit;
    this.rank = rank;
};

let Rank = function (rankName, value) {
    this.name = rankName;
    this.value = value;
}

let StSuit = ['S', 'H', 'D', 'C'];
let suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
let StRank = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
let rankNames = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];
let ranks = [];

let deck = [];
for (let j = 0; j < rankNames.length; ++j) {
    let r = new Rank(rankNames[j], 14 - j);
    for (let i = 0; i < suits.length; ++i) {
        deck.push(new Card(suits[i], r));
    }
    ranks.push(r);
}

Card.from = function (suit, rankName) {
    var j = rankNames.indexOf(rankName);
    var i = suits.indexOf(suit);
    return deck[j * 4 + i];
}

Rank.from = function (rankName) {
    return ranks[rankNames.indexOf(rankName)];
}

module.exports = {
    SuitNames: suits,
    StSuitNames: StSuit,
    RankNames: rankNames,
    StRankNames: StRank,
    Suits: suits,
    Ranks: ranks,
    Deck: deck,
    Card: Card,
    Rank: Rank,
};