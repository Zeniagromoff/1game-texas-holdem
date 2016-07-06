'use strict'
const v$ = 0, c$ = 1;

function _count(input, output) {
    var sts = output.suits = new Map(), rks = output.ranks = new Map();
    output.opps = 7 - input.length;
    for (var i = 0; i < input.length; i++) {
        var card = input[i];
        var suit = card.suit, rValue = card.rank.value;
        if (sts.has(suit)) {
            sts.get(suit).push([rValue, 1]);
        } else {
            sts.set(suit, [[rValue, 1]]);
        }
        if (rks.has(rValue)) {
            rks.set(rValue, rks.get(rValue) + 1);
        } else {
            rks.set(rValue, 1);
        }
    }
    output.suits.forEach(function (vcArr, suit, map) {
        if (vcArr.length >= 5) {
            output.suit = suit;
            _countKinds(vcArr, output);
            output.type = (output.type === 'Straight' ? 'StraightFlush' : 'Flush');
        }
    })
    if (!output.type) {
        _countKinds(Array.from(output.ranks.entries()), output);
    }
    return output;
}

function _countKinds(vcArr, output) {
    vcArr.sort(function (a, b) {
        // b is greater than a, then swap.
        var count = b[c$] - a[c$];
        if (count == 0) count = b[v$] - a[v$];
        return count;
    });
    if (vcArr.length >= 5) {
        if (vcArr[0][v$] == 14) {
            vcArr.push([1, 1]);
        }
        for (var i = 0; i <= vcArr.length - 5; i++) {
            var head = vcArr[i][v$];
            var end = vcArr[i + 4][v$]
            if ((head - end) == 4) {
                output.type = 'Straight';
                output.high = head;
                break;
            }
        }
    }
    if (output.type === 'Straight') {
        return output;
    }
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
        output.high = output.value[0];
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