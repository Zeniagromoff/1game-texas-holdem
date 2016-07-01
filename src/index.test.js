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

        it('should return an array of random items with the specified length', function () {
            var items = lib.random(3);
            expect(items).to.have.length(3);
            items.forEach(function (item) {
                expect(lib.all).to.include(item);
            })
        })

        it('should return an array of random items with Deck size' + lib.all.length, function () {
            var items = lib.random(Number.MAX_SAFE_INTEGER);
            expect(items).to.have.length(lib.all.length);
        })
    })
})