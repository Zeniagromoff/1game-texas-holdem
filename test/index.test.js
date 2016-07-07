import {expect} from 'chai';
import {all, poker, random, create, rule} from '../src/index';
var Card = poker.Card, Rank = poker.Rank;

describe('poker', function () {

    describe('all', function () {
        it('should be an array of Cards', function () {
            expect(all).to.satisfy(isArrayOfCards);

            function isArrayOfCards(array) {
                return array.every(function (item) {
                    return item instanceof Card;
                })
            }
        })

        it('should contain `King of Hearts`', function () {
            expect(all).to.include(new Card('Hearts', new Rank('King', 13)));
        })
    })

    describe('game', function () {
        it('should return undefined', function () {
            var game = create();
            expect(game).to.be.undefined;
        })

        var num = 8, drawn = (num * 2), left = all.length - drawn - 3 - 5;
        var game = create(num);
        it('should has a game of ' + num + ' participants', function () {
            expect(game.n).to.equal(num);
        })

        it('should has a two-dimension array with ' + drawn + ' elements', function () {
            expect(game.hands).to.have.length(2);
            game.hands.forEach(function (hand) {
                expect(hand).to.have.length(num);
            })
            expect(game.board).to.have.length(5);
            expect(game.remain()).to.equal(left);
        })
    })
})