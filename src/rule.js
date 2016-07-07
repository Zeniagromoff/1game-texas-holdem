'use strict'
const v$ = 0, c$ = 1;

function _count(input, output) {
    var sts = output.suits = new Map(), rks = output.ranks = new Map();
    output.opps = 7 - input.length;
    var max = 0, ms;
    for (var i = 0; i < input.length; i++) {
        var card = input[i];
        var suit = card.suit, rValue = card.rank.value;
        if (max + 7 - i >= 5) {
            if (!sts.has(suit)) {
                sts.set(suit, []);
            }
            var suited = sts.get(suit);
            suited.push([rValue, [i]]);
            if (suited.length > max) {
                max = suited.length; ms = suit;
            }
        }
        if (!rks.has(rValue)) {
            rks.set(rValue, []);
        }
        rks.get(rValue).push(i);
    }
    if (max >= 5) {
        var vcArr = output.suits.get(ms);
        output.suit = ms;
        _countKinds(vcArr, output);
        output.type = (output.type === 'Straight' ? 'StraightFlush' : 'Flush');
    } else {
        _countKinds(Array.from(output.ranks.entries()), output);
    }
    return output;
}

function compare(p, c, i, arr) {
    return p[v$] > c[v$] ? p : c;
}

function _countKinds(vcArr, output) {
    vcArr.sort(function (a, b) {
        // b is greater than a, then swap.
        var count = b[c$].length - a[c$].length;
        if (count == 0) count = b[v$] - a[v$];
        return count;
    });
    if (vcArr.length >= 5) {
        if (vcArr[0][v$] == 14) {
            vcArr.push([1, vcArr[0][c$]]);
        }
        for (var i = 0; i <= vcArr.length - 5; i++) {
            var head = vcArr[i][v$];
            var end = vcArr[i + 4][v$]
            if ((head - end) == 4) {
                output.type = 'Straight';
                output.ix = [];
                for (var j = i; j < i + 5; ++j) {
                    output.ix.push(vcArr[j][c$][0]);
                }
                break;
            }
        }
    }
    if (output.type === 'Straight') {
        return output;
    }
    var n0 = vcArr[0][c$], n1 = vcArr[1][c$], n2 = vcArr[2][c$];
    if (n0.length == 4) {
        output.type = 'Quad';
        output.ix = n0.concat(vcArr.slice(1).reduce(compare)[c$][0]);
    } else if (n0.length == 3) {
        if (n1.length > 1) {
            output.type = 'FullHouse';
            output.ix = n0.concat(n1[0], n1[1]);
        } else {
            output.type = 'Set';
            output.ix = n0.concat(n1, n2);
        }
    } else if (n0.length == 2) {
        if (n1.length == 2) {
            output.type = 'TwoPairs';
            output.ix = n0.concat(n1, vcArr.slice(2).reduce(compare)[c$][0]);
        } else {
            output.type = 'Pair';
            output.ix = n0.concat(n1, n2, vcArr[3][c$]);
        }
    } else {
        output.type = 'High';
        output.ix = vcArr.slice(0, 5).map(e => e[c$][0]);
    }
    return output;
}

function count(showhand, board) {
    var input = showhand.concat(board);
    var output = new Object();
    _count(input, output);
    return output;
}

module.exports = { count: count };