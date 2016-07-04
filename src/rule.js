'use strict'
const straight = (1 << 5) + (1 << 4) + (1 << 3) + (1 << 2) + (1 << 1);
const v$ = 0, c$ = 1;

function _count(input, output) {
    var sts = output.suits = new Map(), rks = output.ranks = new Map();
    output.opps = 7 - input.length;
    for (var i = 0; i < input.length; i++) {
        var card = input[i];
        var suit = card.suit, rValue = card.rank.value;
        if (sts.has(suit)) { sts.get(suit).push(rValue); }
        else { sts.set(suit, [rValue]); }
        if (rks.has(rValue)) { rks.set(rValue, rks.get(rValue) + 1); }
        else { rks.set(rValue, 1); }
    }
    output.suits.forEach(function (rankValueArr, suit, map) {
        if (rankValueArr.length >= 5) {
            output.suit = suit;
            _countStraightHigh(rankValueArr, output);
            output.type = (output.type || '') + 'Flush';
        }
    })
    if (!output.type) {
        _countStraightHigh(Array.from(output.ranks.keys()), output);
        if (!output.type) {
            _countKinds(Array.from(output.ranks.entries()), output);
        }
    }
    return output;
}

function _countStraightHigh(rankValueArr, output) {
    var c = 0, s = 0, f, h = 0;
    for (var i = 0; i < rankValueArr.length; i++) {
        var value = rankValueArr[i];
        s += (1 << value);
        if (value == 14) s += (1 << 1);
        if (h < value) h = value;
    }
    while (s >= straight) {
        if ((s & straight) == straight) { f = c; }
        ++c; s = s >> 1;
    }
    if (f) {
        output.type = "Straight";
        output.strHigh = 5 + f;
    }
    output.high = h;
    return output;
}

function _countKinds(vcArr, output) {
    vcArr.sort(function (a, b) {
        // b is greater than a, then swap.
        var count = b[c$] - a[c$];
        if (count == 0) count = b[v$] - a[v$];
        return count;
    });
    if (vcArr[0][c$] == 4) {
        output.type = 'Quad';
        output.value = vcArr.shift()[v$];
        output.high = Math.max.apply(Math, vcArr.map(e => e[v$]));
    } else if (vcArr[0][c$] == 3) {
        output.value = vcArr.shift()[v$];
        if (vcArr[0][c$] > 1) {
            output.type = 'FullHouse';
            output.high = vcArr[0][v$];
        } else {
            output.type = 'Set';
            output.high = [vcArr[0][v$], vcArr[1][v$]];
        }
    } else if (vcArr[0][c$] == 2) {
        if (vcArr[1][c$] == 2) {
            output.type = 'TwoPairs';
            output.value = [vcArr[0][v$], vcArr[1][v$]];
            output.high = vcArr[2][v$];
        } else {
            output.type = 'Pair';
            output.value = vcArr[0][v$];
            output.high = [vcArr[1][v$], vcArr[2][v$], vcArr[3][v$]];
        }
    } else {
        output.type = 'High';
        output.value = vcArr.slice(0, 5).map(e => e[v$]);
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