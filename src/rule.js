'use strict'
const straight = (1 << 5) + (1 << 4) + (1 << 3) + (1 << 2) + (1 << 1);

function _count(input) {
    var res = new Object(), sts = res.suits = new Map(), rks = res.ranks = new Map();
    res.opps = 7 - input.length;
    for (var i = 0; i < input.length; i++) {
        var card = input[i];
        var suit = card.suit, rValue = card.rank.value;
        if (sts.has(suit)) { sts.get(suit).push(rValue); }
        else { sts.set(suit, [rValue]); }
        if (rks.has(rValue)) { rks.set(rValue, rks.get(rValue) + 1); }
        else { rks.set(rValue, 1); }
    }
    return res;
}

function _countStraightHigh(rankValueArr) {
    var c = 0, s = 0, res = new Object(), f, h = 0;
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
    res.strHigh = f ? 5 + f : f;
    res.high = h;
    return res;
}

function count(showhand, board) {
    var input = showhand.concat(board);
    var res = _count(input);
    res.suits.forEach(function (rankValueArr, suit, map) {
        if (rankValueArr.length >= 5) {
            res.suit = suit;
            var r = _countStraightHigh(rankValueArr);
            if (r.strHigh) {
                res.type = 'Straight Flush';
                res.high = r.strHigh;
            } else {
                res.type = 'Flush';
                res.high = r.high;
            }
        }
    })
    if (!res.type) {
        var r = _countStraightHigh(Array.from(res.ranks.keys()));
        if (r.strHigh) {
            res.type = 'Straight';
            res.high = r.strHigh;
        }
    }
    return res;
}

module.exports = { count: count };