'use strict'

import Poker from './poker';
import Rule from './rule';

module.exports = {
    sample: create,
    rule: Rule,
    poker: Poker,
};

function create(numberOfParticipants) {
    if (Number.isInteger(numberOfParticipants)
        && numberOfParticipants < 12) {
        return new game(numberOfParticipants);
    }
}

var game = function (numberOfParticipants) {
    var deck = Array.from(Array(52).keys()),
        draw = () => {
            let counter = deck.length;
            let index = Math.floor(Math.random() * counter);
            return Poker.Deck[deck.splice(index, 1)[0]];
        };;
    this.n = numberOfParticipants;
    this.hands = [];
    for (let i = 0; i < 2; ++i) {
        let deals = [];
        for (let j = 0; j < numberOfParticipants; j++) {
            deals.push(draw());
        }
        this.hands.push(deals);
    }
    draw();
    this.board = [draw(), draw(), draw()];
    draw();
    this.board.push(draw());
    draw();
    this.board.push(draw());
    this.remain = function () {
        return deck.length;
    }
};