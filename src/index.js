'use strict'

const Poker = require('./poker');
let uniqueRandomArray = require('unique-random-array');

module.exports = {
    all: Poker.Deck,
    random: uniqueRandomArray(Poker.Deck),
};