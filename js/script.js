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

    if (crossCheck) {
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
    aLetter = aLetter.toUpperCase();
    if (guessedLetters.includes(aLetter)) {
        message.innerText = "You've already entered this letter. Try again.";
    } else {
        guessedLetters.push(aLetter);
        console.log(guessedLetters);
        addGuesses();
        updateW(guessedLetters);
    }
};

//Function to update player guesses
const addGuesses = function () {
    guesses.innerHTML = "";
    for (const item of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = item;
        guesses.append(li);
    }
};

//Function to update the word in progress
const updateW = function (theGuesses) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    console.log(wordArray);
    for (const item of wordArray) {
        if (theGuesses.includes(item)) {
            revealWord.push(item.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkWon();
};


//Function to check if player won
const checkWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
};