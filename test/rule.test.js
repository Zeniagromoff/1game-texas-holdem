import {expect} from 'chai';
import {rule, poker} from '../src/index';
const count = rule.count, $ = poker.Card.from;

describe('rule', function () {

    describe('count', function () {
        it('should be a Flush', function () {
            var showhand = [
                $('Diamonds', 'Seven'),
                $('Diamonds', 'Ace')
            ];
            var board = [
                $('Diamonds', 'Eight'),
                $('Hearts', 'Four'),
                $('Diamonds', 'Nine'),
                $('Diamonds', 'Two'),
                $('Diamonds', 'Four')
            ];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'flush');
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r.suited).to.be.instanceof(Array).to.eql([0, 2, 3, 4, 5, 6]);
        })

        it('should not be undefined for now', function () {
            var showhand = [
                $('Spades', 'Seven'),
                $('Clubs', 'Eight')
            ];
            var board = [
                $('Hearts', 'Four'),
                $('Diamonds', 'Nine'),
                $('Spades', 'Eight'),
                $('Hearts', 'Nine'),
                $('Diamonds', 'Four')
            ];
            var r = count(showhand, board);
            expect(r).to.be.undefined;
        })
    })
})