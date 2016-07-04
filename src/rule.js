function count(showhand, board) {
    var arr = board.concat(showhand);
    var suits = new Map(), suit;
    for (var i = 0; i < arr.length; i++) {
        var card = arr[i];
        if (!suits.has(card.suit)) {
            if (suits.size == 3) break;
            suits.set(card.suit, []);
        }
        var suited = suits.get(card.suit);
        suited.push(i);
        if (suited.length == 5) { suit = card.suit }
    }
    if (suit !== undefined) {
        var r = countRanks(suited.map(function (i) { return arr[i]; }));
        return {
            type: 'flush',
            suit: suit,
            suited: suited,
        }
    }
    return;
}

function countRanks(arr) {
}

module.exports = { count: count };