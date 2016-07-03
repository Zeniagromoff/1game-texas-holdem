function count(showhand, board) {
    var arr = board.concat(showhand);
    var suits = new Map();
    for (var i = 0; i < arr.length; i++) {
        var card = arr[i];
        if (!suits.has(card.suit)) {
            if (suits.size == 3) break;
            suits.set(card.suit, []);
        }
        var suited = suits.get(card.suit);
        suited.push(i);
        if (suited.length == 5) {
            var r = countRanks(suited.map(function (i) { return arr[i]; }));
            return {
                type: 'flush',
                suit: card.suit,
                index: suited,
            }
        }
    }
    return countRanks(arr);
}

function countRanks(arr) {
}

module.exports = { count: count };