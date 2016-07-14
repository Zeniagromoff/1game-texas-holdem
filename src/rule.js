'use strict'
const v$ = 0, c$ = 1;
const rankings = ['High', 'Pair', 'TwoPairs', 'Set', 'Straight', 'Flush', 'FullHouse', 'Quad', 'StraightFlush'];

function _count(input, output) {
    var sts = output.suits = new Map(), rks = output.ranks = new Map();
    output.opps = 7 - input.length;
    var max = 0, ms;
    for (var i = 0; i < input.length; i++) {
        var card = input[i];
        var suit = card.suit, rValue = card.rank.value;
        if (max + input.length - i >= 5) {
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
        output.rank = (output.rank === 4 ? 8 : 5);
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
        return b[v$] - a[v$];
    });
    if (vcArr.length >= 5) {
        if (vcArr[0][v$] == 14) {
            vcArr.push([1, [vcArr[0][c$][0]]]);
        }
        for (var i = 0; i <= vcArr.length - 5; i++) {
            var head = vcArr[i][v$], end = vcArr[i + 4][v$];
            if ((head - end) == 4) {
                output.rank = 4;
                output.ix = vcArr.slice(i, i + 5).map(e => e[c$][0]);
                return;
            }
        }
    }
    vcArr.sort(function (a, b) {
        return b[c$].length - a[c$].length;
    });
    var n0 = vcArr[0][c$], n1 = vcArr[1][c$], n2 = vcArr[2][c$];
    if (n0.length == 4) {
        output.rank = 7;
        output.ix = n0.concat(vcArr.slice(1).reduce(compare)[c$][0]);
    } else if (n0.length == 3) {
        if (n1.length > 1) {
            output.rank = 6;
            output.ix = n0.concat(n1[0], n1[1]);
        } else {
            output.rank = 3;
            output.ix = n0.concat(n1, n2);
        }
    } else if (n0.length == 2) {
        if (n1.length == 2) {
            output.rank = 2;
            output.ix = n0.concat(n1, vcArr.slice(2).reduce(compare)[c$][0]);
        } else {
            output.rank = 1;
            output.ix = n0.concat(n1, n2, vcArr[3][c$]);
        }
    } else {
        output.rank = 0;
        output.ix = vcArr.slice(0, 5).map(e => e[c$][0]);
    }
    return output;
}

function count(input) {
    var output = new Object();
    _count(input, output);
    return output;
}

function fight(a, b) {
    var check = (obj) => {
        if (!obj.output) {
            obj.output = new Object();
            _count(obj.input, obj.output);
        }
    };
    check(a);
    check(b);
    var ai = types.indexOf(a.output.type);
    var bi = types.indexOf(b.output.type);
    return ai - bi;
}

module.exports = {
    count: count,
    fight: fight,
    rankings: rankings,
};