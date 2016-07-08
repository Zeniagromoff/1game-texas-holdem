# 1game-TexasHoldEm

[![Travis Build](https://img.shields.io/travis/hausenism/1game-TexasHoldEm.svg?style=flat-square)](https://travis-ci.org/hausenism/1game-TexasHoldEm)
[![Github Release](https://img.shields.io/github/release/hausenism/1game-TexasHoldEm.svg?style=flat-square)](https://github.com/hausenism/1game-TexasHoldEm)

## Installation
    npm i 1game-texas-holdem --save

## Usage
### import the library
```javascript
var th = require('1game-texas-holdem');
```
### starts a sample game
```javascript
// sample game supports 0-11 players
var numOfPlayers = 5;
// API - `sample`
var new_sample = th.sample(numOfPlayers);
// reveal the Board
// sample game stores the Board as an array of 5 Cards.
var board = new_sample.board;
console.log('The Board: ', board);
// reveal the players' Hands
// sample game stores the players' Hands in a two-dimensional array.
var hands = new_sample.hands;
console.log('The Hands: ', hands);
// reveal the 5th Player's Hands
var playerIndex = 4;
var pHands = [ hands[0][playerIndex], hands[1][playerIndex] ];
console.log('The 5th Player\'s Hands: ', pHands);
```
### counting
```javascript
// after you retrieve the Hands and the Board.
// API - `rule` -> `count`
var output = th.rule.count(pHands, board);
// show what the player hits
console.log(output.type);
// show the related indexs
console.log(output.ix);
```

## API
### poker
* SuitNames (Suits' Names)
* StSuitNames   (ShortNames for SuitNames)
* RankNames (Ranks' Names)
* StRankNames   (ShortNames for RankNames)
* Suits (4 Suits)
* Ranks (13 Ranks from Ace to Two)
* Deck  (52 Cards in initial order)
* Card  (Card prototype)
* Rank  (Rank prototype)

### rule
* count
* fight

### sample
    a simple game structure 