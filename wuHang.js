
var masterWordList = // Word list
[
    "CSHARP",   
    "C PLUS PLUS",
    "RUBY ON RAILS",
    "PYTHON",
    "JAVASCRIPT",
    "ANSI C",
    "COBOL",
    "FORTRAN",
    "VISUAL BASIC",
    "COMPILER",
    "ALGORITHM",
    "QBASIC",
    "ASP NET",
    "FRAMEWORK",
];

const totalMaxTries = 10; // Maximum number of tries player has
const space = "space";
// Updates the image depending on how many guesses


// Hangman game object
var hangmanGame = {
wordList: masterWordList,       //  Holds the word list, this can be any array of strings
guessingWord: [],                   //  Holds the characters we've guessed right
guessedLetters: [],             //  Holds the unique letters we've guessed
currentWord: "",                //  Holds the current word we're guessing from the wordList
lastWordIdx: -1,                //  Holds the last word index, so we don't pick the same word twice in a row 
wins: 0,                        //  Total wins
maxTries: totalMaxTries,        //  Max tries, front const above
remainingGuesses: 0,            //  Remaining guesses, zero it out.
hasFinished: true,              //  If we've either won or loss
keySound: new Audio('./assets/sounds/typewriter-key.wav'),      //  Holds the sound for a keypress
winSound: new Audio('./assets/sounds/you-win.wav'),             //  Holds the winningiest sound
loseSound: new Audio('./assets/sounds/you-lose.wav'),           //  Holds the most loser of all sounds
wrongKey: new Audio('./assets/sounds/wrong-key.mp3'),
// resetGame() function
// resets all of our game variables.  Should be ran first.
resetGame: function () {
    var idx = -1;
    do  {
        idx = Math.floor(Math.random() * this.wordList.length);
    } while(idx === this.lastWordIdx)
    
    this.currentWord = this.wordList[idx];
    this.lastWordIdx = idx;
    
    // Zero out our working arrays.  guessingWord builds our working string, 
    // guessedLetters holds all letters guessed.
    this.guessingWord = [];
    this.guessedLetters = [];

    // Reset remainingTries
    this.remainingGuesses = this.maxTries;

    // We have not finished the game
    this.hasFinished = false;

    // Make sure the hangman image is cleared
    document.getElementById("hangmanImage").src = "";
    
    // Build the guessing word and populate with underscores
    var len = this.currentWord.length;
    for (var i = 0; i < len; i++) {
        
        if(this.currentWord[i] === " ") {
            this.guessingWord.push(space);
        } else {
            this.guessingWord.push("_");
        }
    }

    // Hide game over and win images/text
    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Show display
    this.updateDisplay();
},
// updateDisplay() function
// Updates the HTML display area
updateDisplay: function () {
    // Total Wins
    document.getElementById("totalWins").innerText = this.wins;
    // What we have so far of the currentword
    var tempWord = "";
    for (var i = 0; i < this.guessingWord.length; i++) {
        if(this.guessingWord[i] === space) {
            tempWord += "&nbsp;";
        } else {
            tempWord += this.guessingWord[i];
        }
    }
    document.getElementById("currentWord").innerHTML = tempWord;
    document.getElementById("remainingGuesses").innerText = this.remainingGuesses;
    document.getElementById("guessedLetters").innerText = this.guessedLetters;
},
// updateHangmanImage() function
updateHangmanImage: function () {
    // Displays the new hangman image
    document.getElementById("hangmanImage").src = "assets/images/" + (this.maxTries - this.remainingGuesses) + ".png";
},
// makeGuess(letter) function
// Begins the guess - if we have guesses left we evaluate it
makeGuess: function (letter) {
    if (this.remainingGuesses > 0) {
        // Make sure we didn't use this letter yet
        if (this.guessedLetters.indexOf(letter) === -1) {
            this.guessedLetters.push(letter);
            this.keySound.play();
            this.evaluateGuess(letter);
        } else {
            this.wrongKey.play();
        }
    }
    this.checkWinLose();
    this.updateDisplay();
},
// evaluateGuess(letter) function
// Scans through our currentWord to see how many iterations of a letter appear.  Then, change our guessingWord with each letter.
evaluateGuess: function (letter) {
    // Array to store positions of letters in string
    var positions = [];

    // Loop through word finding all instances of guessed letter, store the indicies in an array.
    for (var i = 0; i < this.currentWord.length; i++) {
        if (this.currentWord[i] === letter) {
            positions.push(i);
        }
    }

    // if there are no indicies, remove a guess and update the hangman image
    if (positions.length <= 0) {
        this.remainingGuesses--;
        this.updateHangmanImage();
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            this.guessingWord[positions[i]] = letter;
        }
    }
},
// checkWin() function
// Check's whether we've won the game
checkWinLose: function () {
    if (this.guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        // Tack on a win
        this.wins++;
        // Play the winning sound
        this.winSound.play();
        // Flag we're done with the game
        this.hasFinished = true;
        return;
    }
    if (this.remainingGuesses <= 0) {
        this.loseSound.play();
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        this.hasFinished = true;
        return;
    }
},
};

// isLetter(keyCode)
// Check if the keyCode falls between A-Z
function isLetter(keyCode) {
return (keyCode >= 65 && keyCode <= 90);
}

// Keyboard event handler
document.onkeydown = function (event) {
// If we finished a game, dump one keystroke and reset.
if (hangmanGame.hasFinished) {
    hangmanGame.resetGame();
    hangmanGame.hasFinished = false;
} else {
    // Check to make sure a-z was pressed.
    if (isLetter(event.keyCode)) {
        hangmanGame.makeGuess(event.key.toUpperCase());
    } else {
        hangmanGame.wrongKey.play();
    }
}
};