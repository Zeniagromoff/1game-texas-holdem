'use strict'

import Poker from './poker';
import uniqueRandomArray from 'unique-random-array';
import validate from 'validate.js';
import game from './game';

module.exports = {
    all: Poker.Deck,
    random: random,
    create: create,
    rule: require('./rule'),
    poker: Poker,
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
    if (validate.isInteger(numberOfParticipants)
        && numberOfParticipants < 12) {
        return new game(numberOfParticipants);
    }
}