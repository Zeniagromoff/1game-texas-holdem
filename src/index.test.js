import {expect} from 'chai';
var lib = require('./index');
var Card = require('./card');

describe('poker', function () {

    describe('all', function () {
        it('should be an array of Cards', function () {
            expect(lib.all).to.satisfy(isArrayOfCards);

            function isArrayOfCards(array) {
                return array.every(function (item) {
                    return item instanceof Card;
                })
            }
        })

        it('should contain `King of Hearts`', function () {
            expect(lib.all).to.include(new Card('Hearts', 'King'));
        })
    })

    describe('random', function () {
        it('should return a random item from the Deck', function () {
            var i = lib.random();
            expect(lib.all).to.include(i);
        })

        it('should return an array of random items with the specified length', function () {
            var items = lib.random(3);
            expect(items).to.have.length(3);
            items.forEach(function (item) {
                expect(lib.all).to.include(item);
            })
        })

        it('should return an array of random items with Deck size: ' + lib.all.length, function () {
            var items = lib.random(Number.MAX_SAFE_INTEGER);
            expect(items).to.have.length(lib.all.length);
        })
    })

    describe('game', function () {
        it('should return undefined', function () {
            var game = lib.create();
            expect(game).to.be.undefined;
        })

        var num = 8, drawn = (num * 2), left = lib.all.length - drawn;
        var game = lib.create(num);
        it('should has a game of ' + num + ' participants', function () {
            expect(game.n).to.equal(num);
        })

        it('should has a two-dimension array with ' + drawn + ' elements', function () {
            game.start();
            expect(game.hands).to.have.length(2);
            game.hands.forEach(function (hand) {
                expect(hand).to.have.length(num);
            })
        })

        it('should return undefined when deck is out', function () {
            for (var i = 0; i < left; i++) { game.draw(); }
            expect(game.draw()).to.be.undefined;
        })

        var headsUp = lib.create(2);
        it('should only one flop action burns a card and deals 3 cards to board', function () {
            expect(headsUp.board).to.have.length(0);
            headsUp.flop();
            expect(headsUp.board).to.have.length(3);
            headsUp.flop();
            expect(headsUp.board).to.have.length(3);
            expect(headsUp.remain()).to.equal(lib.all.length - 4);
        })

        it('should only one turn action burns a card and deals a card to board', function () {
            expect(headsUp.board).to.have.length(3);
            headsUp.turn();
            expect(headsUp.board).to.have.length(4);
            headsUp.turn();
            expect(headsUp.board).to.have.length(4);
            expect(headsUp.discard).to.have.length(2);
        })

        it('should only one river action burns a card and deals a card to board', function () {
            expect(headsUp.board).to.have.length(4);
            headsUp.river();
            expect(headsUp.board).to.have.length(5);
            headsUp.river();
            expect(headsUp.board).to.have.length(5);
            expect(headsUp.discard).to.have.length(3);
        })
    })
})