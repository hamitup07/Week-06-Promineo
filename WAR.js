
/* 

    Steve Hamilton
    Promineo Week 06 Assignment
    2023-3-30-fe

    Assignment parameters: 
    -Create an automated version of the classic card game WAR!
    -Deal cards to players, iterate through turns and assign a point to the player with the higher card.
    -Display score and declare winner when all cards have been played
    -Write a unit test using Mocha and Chai for at least one of the functions.


*/

// Step 1: declare classes. There are classes for cards, the dealer's deck, players and the game itself.

//The Card class contains suit and value parameters. This allows for 4 cards in the dealer deck of each numerical value. Face cards are translated to numerical values later.
class Card {
    constructor(suit, value) {
        this.suit = suit;
        this.value = value;
    } 
}

//The Deck class is only used for the dealer's deck. Player decks are arrays within the Player class. Note that the deck has an integrated shuffle function, which means each time a deck is created it comes pre-shuffled.
//All card values in the Deck class are strings.
class Deck {
    constructor () {
        this.deck = [];

        const suits = ["Spades", "Clubs", "Hearts", "Diamonds"];
        const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

        for (let suit in suits) {
            for (let value in values) {
                    this.deck.push(new Card((suits[suit]), (values[value])));
            }
        }
        //shuffle function:
        for (let i = 0; i < this.deck.length; i++) {
            let shuffle = Math.floor(Math.random() * (this.deck.length));
    
            let temp = this.deck[i];
            this.deck[i] = this.deck[shuffle]; 
            this.deck[shuffle] = temp; 
         }
    }
}

//Because the Dealer deck will send cards to players later, players each start with an empty array and 0 points.
class Player {
    constructor() {
        this.playerDeck = [];
        this.points = 0;
    }
}

//This variable will be referenced later to allow the numerical comparison of player card values. Because card values are naturally a mixture of string and numerical values, I declared all of them as strings initially in the Deck class so they could each be transformed to numerical values in this variable.
//Translating all values to numerical values means that each card can be compared to other cards and receive the proper ranking.
const cardValues = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "J": 11,
    "Q": 12,
    "K": 13,
    "A": 14
}

//Here is the "meat" of the game:
class Game {
    constructor() {

    }

    startGame() {
        this.deal();
        console.log("Let the Game of War Begin:");
        this.round();
        
    }

    //The dealer deck is already shuffled, because each instance of a Deck object is shuffled on creation. So the deal method simply hands out cards to the players.
    deal() {
        while (dealerDeck.deck.length > 0) {
            player1.playerDeck.unshift(dealerDeck.deck.pop());
            player2.playerDeck.unshift(dealerDeck.deck.pop());
        }
    }

    //"round" is the method that actually playes out the game. in the initial if statement, the cardValues variable is referenced to compare the numerical value of the cards in the 0 index position of each player's deck array.
    round() {
        if (((cardValues[player1.playerDeck[0].value])) > ((cardValues[player2.playerDeck[0].value]))) {
            player1.points ++;
            console.log(`Player 1 scores!`);
        } else if (((cardValues[player2.playerDeck[0].value])) > ((cardValues[player1.playerDeck[0].value]))) {
            player2.points ++;
            console.log(`Player 2 scores!`);
        } else if (((cardValues[player1.playerDeck[0].value])) === ((cardValues[player2.playerDeck[0].value]))) {
            console.log("Tie!");
        }
        
        //In classic war, both cards played are added to the winner's deck. I wrote this function into my original code, but found that it crashed the browser because it can take an obscene number of turns to resolve a game that way.
        //Now, both cards are simply removed, meaning there will never be more than 26 rounds.
        player1.playerDeck.shift();
        player2.playerDeck.shift();

        //At the end of each round, I check for the endstate of the game
        if ((player1.playerDeck.length != 0) || (player2.playerDeck.length != 0)) {
            this.round();
        } else {
            this.endstate();
        }

    }

    //This method declares a winner, or in the rare event of a tie, the score of each player.
    endstate() {
        if (player1.points > player2.points) {
            console.log(`Game over. Player 1 wins with a score of ${player1.points}!`);
        } else if (player1.points < player2.points) {
            console.log(`Game over. Player 2 wins with a score of ${player2.points}!`);
        } else if (player1.points === player2.points) {
            console.log(`Game over. The score is tied at ${player1.points} to ${player2.points}.`)
        }
    }
    
}

//Step 2: Declare the needed instances of each class.
let player1 = new Player;
let player2 = new Player;
let dealerDeck = new Deck;
let mygame = new Game;

//Step 3: Call the method that will begin the game.
mygame.startGame();

