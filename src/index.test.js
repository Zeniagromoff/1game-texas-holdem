var expect = require('chai').expect;
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
    })
})