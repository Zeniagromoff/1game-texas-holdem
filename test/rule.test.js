import {expect} from 'chai';
import {rule, poker} from '../src/index';
const count = rule.count, $ = poker.Card.from, R = poker.Rank.from;

describe('rule', function () {

    describe('count', function () {

        it('should be a Straight Flush with Ten High', function () {
            var showhand = [$('Diamonds', 'Seven'), $('Diamonds', 'Ten')];
            var board = [$('Diamonds', 'Eight'), $('Hearts', 'Four'), $('Diamonds', 'Nine'), $('Clubs', 'Two'), $('Diamonds', 'Six')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Straight Flush');
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r).to.have.property('high', R('Ten').value);
        })

        it('should be a Flush with Ace High', function () {
            var showhand = [$('Diamonds', 'Seven'), $('Diamonds', 'Ace')];
            var board = [$('Diamonds', 'Eight'), $('Hearts', 'Four'), $('Diamonds', 'Nine'), $('Diamonds', 'Two'), $('Diamonds', 'Four')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Flush');
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r).to.have.property('high', R('Ace').value);
        })

        it('should be a Straight with Jack High', function () {
            var showhand = [$('Spades', 'Seven'), $('Clubs', 'Eight')];
            var board = [$('Hearts', 'Four'), $('Diamonds', 'Nine'), $('Spades', 'Ten'), $('Hearts', 'Jack'), $('Diamonds', 'Four')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Straight');
            expect(r).to.have.property('high', R('Jack').value);
        })

        it('should be implemented later', function () {
            var showhand = [$('Spades', 'Seven'), $('Clubs', 'Eight')];
            var board = [$('Hearts', 'Four'), $('Diamonds', 'Nine'), $('Spades', 'Eight'), $('Hearts', 'Nine'), $('Diamonds', 'Four')];
            var r = count(showhand, board);
            expect(r.suits).to.be.instanceof(Map);
            expect(Array.from(r.suits.keys())).to.include('Diamonds');
            expect(r.suits.get('Diamonds')).to.be.instanceof(Array).to.include(R('Nine').value);
        })
    })
})