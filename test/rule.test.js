import {expect} from 'chai';
import {rule} from '../src/index';
const count = rule.count;

describe('rule', function () {

    describe('count', function () {
        it('should be a Flush', function () {
            var showhand = [
                { suit: 'Diamonds', rank: 'Seven' },
                { suit: 'Diamonds', rank: 'Ace' }
            ];
            var board = [
                { suit: 'Diamonds', rank: 'Eight' },
                { suit: 'Hearts', rank: 'Four' },
                { suit: 'Diamonds', rank: 'Nine' },
                { suit: 'Clubs', rank: 'Eight' },
                { suit: 'Diamonds', rank: 'Four' }
            ];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'flush');
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r.index).to.be.instanceof(Array).to.eql([0, 2, 4, 5, 6]);
        })

        it('should not be undefined for now', function () {
            var showhand = [
                { suit: 'Spades', rank: 'Seven' },
                { suit: 'Clubs', rank: 'Eight' }
            ];
            var board = [
                { suit: 'Hearts', rank: 'Four' },
                { suit: 'Diamonds', rank: 'Nine' },
                { suit: 'Spades', rank: 'Eight' },
                { suit: 'Hearts', rank: 'Nine' },
                { suit: 'Diamonds', rank: 'Four' }
            ];
            var r = count(showhand, board);
            expect(r).to.be.undefined;
        })
    })
})