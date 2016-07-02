'use strict'

const Poker = require('./poker');
let uniqueRandomArray = require('unique-random-array'),
    validate = require("validate.js");
let game = require('./game');

module.exports = {
    all: Poker.Deck,
    random: random,
    create: create,
};

function random(size) {
    let getRandomItem = uniqueRandomArray(Poker.Deck);
    if (validate.isInteger(size)) {
        let items = [];
        for (let i = 0; i < Math.min(Poker.Deck.length, size); i++) {
            items.push(getRandomItem());
        }
        return items;
    }
    return getRandomItem();
}

function create(numberOfParticipants) {
    if (validate.isInteger(numberOfParticipants)) {
        return new game(numberOfParticipants);
    }
}