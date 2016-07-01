'use strict'

const Poker = require('./poker');
let uniqueRandomArray = require('unique-random-array'),
    getRandomItem = uniqueRandomArray(Poker.Deck),
    validate = require("validate.js");

module.exports = {
    all: Poker.Deck,
    random: random,
};

function random(number) {
    if (validate.isInteger(number)) {
        var items = [];
        for (var i = 0; i < Math.min(Poker.Deck.length, number); i++) {
            items.push(getRandomItem());
        }
        return items;
    }
    return getRandomItem();
}