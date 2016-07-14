import {expect} from 'chai';
import {rule, poker} from '../src/index';
const count = rule.count, $ = poker.Card.from, R = poker.Rank.from;

var shortrank = poker.StRankNames;
var shortsuit = poker.StSuitNames;
for (let j = 0; j < shortrank.length; ++j) {
    var rankN = shortrank[j];
    for (let i = 0; i < shortsuit.length; ++i) {
        global[shortsuit[i] + "_" + rankN] = poker.Deck[j * 4 + i];
    }
}

describe('rule', function () {

    describe('count', function () {

        it('should be a Straight Flush with Ten High', function () {
            var r = count([D_7, D_T, D_8, H_4, D_9, C_2, D_6]);
            expect(r).to.have.property('rank', 8);
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r.ix[0]).to.equal(1);
        })

        it('should be a Flush with Ace High', function () {
            var input = [D_7, D_A, D_8, H_4, D_9, D_3, C_4];
            var r = count(input);
            expect(r).to.have.property('rank', 5);
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r.ix[0]).to.equal(1);
            expect(input[r.ix[0]]).to.have.property('rank', R('Ace'));
            expect(input[r.ix[0]]).to.equal($('Diamonds', 'Ace'));
        })

        it('should be a Straight with Jack High', function () {
            var r = count([S_7, C_8, H_4, D_9, S_T, H_J, D_4]);
            expect(r).to.have.property('rank', 4);
            expect(r.ix[0]).to.equal(5);
        })

        it('should be a Straight with King High', function () {
            var r = count([S_Q, C_K, H_Q, D_9, S_T, H_J, D_4]);
            expect(r).to.have.property('rank', 4);
            expect(r.ix[0]).to.equal(1);
        })

        it('should be a Straight with Five High', function () {
            var r = count([S_A, C_8, H_4, D_3, S_T, H_5, D_2]);
            expect(r).to.have.property('rank', 4);
            expect(r.ix[4]).to.equal(0);
        })

        it('should be a Quad of Queen with Ace High', function () {
            var r = count([S_Q, C_Q, H_Q, D_9, S_A, H_9, D_Q]);
            expect(r).to.have.property('rank', 7);
            expect(r.ix[0]).to.equal(0);
            expect(r.ix[4]).to.equal(4);
        })

        it('should be a Quad of Two with Ten High', function () {
            var r = count([S_2, C_2, H_2, S_T, H_6, D_9, D_2]);
            expect(r).to.have.property('rank', 7);
            expect(r.ix[1]).to.equal(1);
            expect(r.ix[4]).to.equal(3);
        })

        it('should be a FullHouse of Eight with Five High', function () {
            var r = count([S_8, C_2, H_5, D_5, C_5, H_8, D_8]);
            expect(r).to.have.property('rank', 6);
            expect(r.ix[1]).to.equal(5);
            expect(r.ix[4]).to.equal(3);
        })

        it('should be a FullHouse of Five with Ace High', function () {
            var r = count([S_8, D_A, H_5, C_A, D_5, C_5, H_8]);
            expect(r).to.have.property('rank', 6);
            expect(r.ix[0]).to.equal(2);
            expect(r.ix[4]).to.equal(3);
        })

        it('should be a FullHouse of Five with Eight High', function () {
            var r = count([S_8, D_A, H_5, C_2, D_5, C_5, H_8]);
            expect(r).to.have.property('rank', 6);
            expect(r.ix[2]).to.equal(5);
            expect(r.ix[4]).to.equal(6);
        })

        it('should be a Set of Nine with King & Eight High', function () {
            var r = count([S_9, D_K, H_9, C_2, D_9, C_5, H_8]);
            expect(r).to.have.property('rank', 3);
            expect(r.ix[0]).to.equal(0);
            expect(r.ix[3]).to.equal(1);
            expect(r.ix[4]).to.equal(6);
        })

        it('should be a TwoPairs of King & Queen with Jack High', function () {
            var r = count([S_Q, D_K, H_K, C_J, D_Q, C_A, H_J]);
            expect(r).to.have.property('rank', 2);
            expect(r.ix[0]).to.equal(1);
            expect(r.ix[2]).to.equal(0);
            expect(r.ix[4]).to.equal(5);
        })

        it('should be a TwoPairs of King & Jack with Five High', function () {
            var r = count([S_2, D_K, H_K, C_J, D_4, C_5, H_J]);
            expect(r).to.have.property('rank', 2);
            expect(r.ix[1]).to.equal(2);
            expect(r.ix[2]).to.equal(3);
            expect(r.ix[4]).to.equal(5);
        })

        it('should be a Pair of King with Jack & Seven & Five High', function () {
            var r = count([S_2, D_K, H_K, C_J, D_4, C_5, H_7]);
            expect(r).to.have.property('rank', 1);
            expect(r.ix[0]).to.equal(1);
            expect(r.ix[3]).to.equal(6);
            expect(r.ix[4]).to.equal(5);
        })

        it('should be a High of Ace & King & Jack & Seven & Six High', function () {
            var showhand = [S_A, D_K, H_6, C_J, D_2, C_5, H_7];
            var r = count(showhand);
            expect(r).to.have.property('rank', 0);
            expect(r.ix[0]).to.equal(0);
        })

        it('should be a TwoPairs of Queen & Five with King High', function () {
            var r = count([H_T, C_5, D_8, C_Q, S_K, D_Q, H_5]);
            expect(r).to.have.property('rank', 2);
            expect(r.ix[0]).to.equal(3);
            expect(r.ix[2]).to.equal(1);
            expect(r.ix[4]).to.equal(4);
        })

        it('should be a Pair of Ace with Ten & Jack & Nine High', function () {
            var input = [C_J, H_T, D_A, D_4, C_8, D_9, H_A];
            var r = count(input);
            expect(r).to.have.property('rank', 1);
            expect(r.ix[0]).to.equal(2);
            expect(r.ix[2]).to.equal(0);
            expect(r.ix[3]).to.equal(1);
            expect(r.ix[4]).to.equal(5);
        })

        it('should be a wins over b', function () {
            var a = { input: [D_7, D_T, D_8, H_4, D_9, C_2, D_6] };
            var b = { input: [H_T, C_5, D_8, H_4, D_9, C_2, D_6] };
            b.output = count([H_T, C_5], [D_8, H_4, D_9, C_2, D_6]);
            var r = rule.fight(a, b);
            expect(r < 0).to.equal(true);
        })
    })
})