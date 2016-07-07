'use strict'

import Poker from './poker';
import validate from 'validate.js';
import game from './game';

module.exports = {
    all: Poker.Deck,
    create: create,
    rule: require('./rule'),
    poker: Poker,
};

function create(numberOfParticipants) {
    if (validate.isInteger(numberOfParticipants)
        && numberOfParticipants < 12) {
        return new game(numberOfParticipants);
    }
}