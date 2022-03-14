const guesses = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterElement = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];
console.clear();

//Function to update words in progress with ●
const placeHolder = function (theWord) {
    const placeholder = [];
    for (letter of theWord) {
        placeholder.push("●");
    }
    wordInProgress.innerText = placeholder.join("");
};

placeHolder(word);

//Event listener for the guess button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();     //prevent form from submitting
    const playerInput = letterElement.value;
    console.log(playerInput);
    letterElement.value = "";       //why doesnt playerInput work?

    message.innerText = "";
    const crossCheck = validator(playerInput);
    console.log(crossCheck);

    if (crossCheck !== undefined) {
        makeGuess(playerInput);
    }
});

//Function to validate user input
const validator = function (input) {
    const acceptedLetter = /[a-zA-z]/;

    if (input.length === 0) {
        message.innerText = "Uh-oh! You may have forgotten to input a letter. Try again.";
    } else if (input.length > 1) {
        message.innerText = "Sorry, only one letter at a time."
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Alphabets only. Please try again."
    } else {
        return input;
    }
};

//Function to capture input
const makeGuess = function(aLetter) {
    aLetter.toUpperCase();
    if (guessedLetters.includes(aLetter)) {
        message.innerText = "You've already entered this letter. Try again.";
    } else {
        guessedLetters.push(aLetter);
    }
    console.log(guessedLetters);
};