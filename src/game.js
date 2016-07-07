'use strict'

const Deck = require('./poker').Deck;

var game = function (numberOfParticipants) {
    var deck = Array.from(Array(52).keys()),
        draw = () => {
            let counter = deck.length;
            let index = Math.floor(Math.random() * counter);
            return Deck[deck.splice(index, 1)[0]];
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

module.exports = game;