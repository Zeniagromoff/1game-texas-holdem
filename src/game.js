'use strict'

const uniqueRandomArray = require('unique-random-array'),
    HAND = 2, Poker = require('./poker');

var game = function (numberOfParticipants) {
    var deck = uniqueRandomArray(Poker.Deck);
    var remain = Poker.Deck.length;
    this.n = numberOfParticipants;
    this.board = [];
    this.hands = [];

    this.draw = function () {
        if (remain > 0) {
            --remain;
            return deck();
        }
    };

    this.flop = function () {
        if (this.board.length == 0) {
            this.draw();
            for (var i = 0; i < 3; i++) {
                this.board.push(this.draw());
            }
        }
    }

    this.start = function () {
        for (let i = 0; i < HAND; ++i) {
            let deals = [];
            for (let j = 0; j < numberOfParticipants; j++) {
                deals.push(this.draw());
            }
            this.hands.push(deals);
        }
    };

    this.remain = function () {
        return remain;
    }
};

module.exports = game;