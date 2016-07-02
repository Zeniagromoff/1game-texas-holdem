const uniqueRandomArray = require('unique-random-array'),
    HAND = 2, Poker = require('./poker');

var game = function (numberOfParticipants) {
    var deck = uniqueRandomArray(Poker.Deck);
    var remain = Poker.Deck.length;
    this.n = numberOfParticipants;

    this.draw = function () {
        if (remain > 0) {
            --remain;
            return deck();
        }
    };

    this.start = function () {
        this.hands = [];
        for (let i = 0; i < HAND; ++i) {
            let deals = [];
            for (let j = 0; j < numberOfParticipants; j++) {
                deals.push(this.draw());
            }
            this.hands.push(deals);
        }
    };
};

module.exports = game;