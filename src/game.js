'use strict'

const uniqueRandomArray = require('unique-random-array'),
    HAND = 2, Poker = require('./poker');

var game = function (numberOfParticipants) {
    var deck = uniqueRandomArray(Poker.Deck);
    var remain = Poker.Deck.length;
    this.n = numberOfParticipants;
    this.board = [];
    this.hands = [];
    this.discard = [];

    this.draw = function () {
        if (remain > 0) {
            --remain;
            return deck();
        }
    };

    this.start = function () {
        for (let i = 0; i < HAND; ++i) {
            let deals = [];
            for (let j = 0; j < numberOfParticipants; j++) {
                deals.push(this.draw());
            }
            this.hands.push(deals);
        }
    };

    this.flop = function () { deals(this, 0, 1, 3); }
    this.turn = function () { deals(this, 3, 1, 1); }
    this.river = function () { deals(this, 4, 1, 1); }

    this.remain = function () {
        return remain;
    }
};

function deals(game, checkBoard, burns, deals) {
    if (game.board.length == checkBoard) {
        for (var i = 0; i < burns; i++) {
            game.discard.push(game.draw());
        }
        for (var i = 0; i < deals; i++) {
            game.board.push(game.draw());
        }
    }
}

module.exports = game;