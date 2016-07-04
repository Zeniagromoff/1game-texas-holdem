import {expect} from 'chai';
import {rule, poker} from '../src/index';
const count = rule.count, $ = poker.Card.from, R = poker.Rank.from;

describe('rule', function () {

    describe('count', function () {

        it('should be a Straight Flush with Ten High', function () {
            var showhand = [$('Diamonds', 'Seven'), $('Diamonds', 'Ten')];
            var board = [$('Diamonds', 'Eight'), $('Hearts', 'Four'), $('Diamonds', 'Nine'), $('Clubs', 'Two'), $('Diamonds', 'Six')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'StraightFlush');
            expect(r).to.have.property('suit', 'Diamonds');
            expect(r).to.have.property('strHigh', R('Ten').value);
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

        it('should be a Quad of Queen with Ace High', function () {
            var showhand = [$('Spades', 'Queen'), $('Clubs', 'Queen')];
            var board = [$('Hearts', 'Queen'), $('Diamonds', 'Nine'), $('Spades', 'Ace'), $('Hearts', 'Nine'), $('Diamonds', 'Queen')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Quad');
            expect(r).to.have.property('value', R('Queen').value);
            expect(r).to.have.property('high', R('Ace').value);
        })

        it('should be a Quad of Two with Ten High', function () {
            var showhand = [$('Spades', 'Two'), $('Clubs', 'Two')];
            var board = [$('Hearts', 'Two'), $('Diamonds', 'Nine'), $('Spades', 'Ten'), $('Hearts', 'Six'), $('Diamonds', 'Two')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Quad');
            expect(r).to.have.property('value', R('Two').value);
            expect(r).to.have.property('high', R('Ten').value);
        })

        it('should be a FullHouse of Eight with Five High', function () {
            var showhand = [$('Spades', 'Eight'), $('Clubs', 'Two')];
            var board = [$('Hearts', 'Five'), $('Diamonds', 'Five'), $('Clubs', 'Five'), $('Hearts', 'Eight'), $('Diamonds', 'Eight')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'FullHouse');
            expect(r).to.have.property('value', R('Eight').value);
            expect(r).to.have.property('high', R('Five').value);
        })

        it('should be a FullHouse of Five with Ace High', function () {
            var showhand = [$('Spades', 'Eight'), $('Diamonds', 'Ace')];
            var board = [$('Hearts', 'Five'), $('Clubs', 'Ace'), $('Diamonds', 'Five'), $('Clubs', 'Five'), $('Hearts', 'Eight')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'FullHouse');
            expect(r).to.have.property('value', R('Five').value);
            expect(r).to.have.property('high', R('Ace').value);
        })

        it('should be a FullHouse of Five with Eight High', function () {
            var showhand = [$('Spades', 'Eight'), $('Diamonds', 'Ace')];
            var board = [$('Hearts', 'Five'), $('Clubs', 'Two'), $('Diamonds', 'Five'), $('Clubs', 'Five'), $('Hearts', 'Eight')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'FullHouse');
            expect(r).to.have.property('value', R('Five').value);
            expect(r).to.have.property('high', R('Eight').value);
        })

        it('should be a Set of Nine with King & Eight High', function () {
            var showhand = [$('Spades', 'Nine'), $('Diamonds', 'King')];
            var board = [$('Hearts', 'Nine'), $('Clubs', 'Two'), $('Diamonds', 'Nine'), $('Clubs', 'Five'), $('Hearts', 'Eight')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Set');
            expect(r).to.have.property('value', R('Nine').value);
            expect(r.high).to.be.instanceof(Array).to.have.lengthOf(2).to.include.members([R('King').value, R('Eight').value]);
        })

        it('should be a TwoPairs of King & Queen with Jack High', function () {
            var showhand = [$('Spades', 'Queen'), $('Diamonds', 'King')];
            var board = [$('Hearts', 'King'), $('Clubs', 'Jack'), $('Diamonds', 'Queen'), $('Clubs', 'Five'), $('Hearts', 'Jack')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'TwoPairs');
            expect(r.value).to.be.instanceof(Array).to.have.lengthOf(2).to.include.members([R('Queen').value, R('King').value]);
            expect(r).to.have.property('high', R('Jack').value);
        })

        it('should be a TwoPairs of King & Jack with Five High', function () {
            var showhand = [$('Spades', 'Two'), $('Diamonds', 'King')];
            var board = [$('Hearts', 'King'), $('Clubs', 'Jack'), $('Diamonds', 'Four'), $('Clubs', 'Five'), $('Hearts', 'Jack')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'TwoPairs');
            expect(r.value).to.be.instanceof(Array).to.have.lengthOf(2).to.include.members([R('Jack').value, R('King').value]);
            expect(r).to.have.property('high', R('Five').value);
        })

        it('should be a Pair of King with Jack & Seven & Five High', function () {
            var showhand = [$('Spades', 'Two'), $('Diamonds', 'King')];
            var board = [$('Hearts', 'King'), $('Clubs', 'Jack'), $('Diamonds', 'Four'), $('Clubs', 'Five'), $('Hearts', 'Seven')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'Pair');
            expect(r).to.have.property('value', R('King').value);
            expect(r.high).to.be.instanceof(Array).to.have.lengthOf(3).to.include.members([R('Seven').value, R('Five').value, R('Jack').value]);
        })

        it('should be a High of Ace & King & Jack & Seven & Six High', function () {
            var showhand = [$('Spades', 'Ace'), $('Diamonds', 'King')];
            var board = [$('Hearts', 'Six'), $('Clubs', 'Jack'), $('Diamonds', 'Two'), $('Clubs', 'Five'), $('Hearts', 'Seven')];
            var r = count(showhand, board);
            expect(r).to.have.property('type', 'High');
            expect(r.value).to.be.instanceof(Array).to.have.lengthOf(5)
                .to.include.members([R('King').value, R('Ace').value, R('Jack').value, R('Six').value, R('Seven').value]);
        })
    })
})