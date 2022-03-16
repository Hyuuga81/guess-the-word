const guesses = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterElement = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

console.clear();

//Async function to get word from API
const getWord = async function () {
    const res = await fetch('https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt');

    const words = await res.text();
    // console.log(words);

    const wordArray = words.split("\n");
    // console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
};

getWord();



//Function to update words in progress with ●
const placeHolder = function (theWord) {
    const placeholder = [];
    for (letter of theWord) {
        placeholder.push("●");
    }
    wordInProgress.innerText = placeholder.join("");
};



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
        guessCounter(aLetter);      //counter function
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
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkWon();
};

//Function to count remaining guesses 
const guessCounter = function (guessInput) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guessInput)) {
        message.innerText = `Sorry, the word has no ${guessInput}`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes! ${guessInput} is a good guess`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${upperWord}</span>. Thanks for playing`;
        startOver();        //Startover
    } else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess`;
    } else  {
        span.innerText = `${remainingGuesses} guesses`;
    }
};

//Function to check if player won
const checkWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
        startOver();        //Startover
    }
};

// Function to start over
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guesses.classList.add("hide");
    playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerText = "";
    guesses.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    
    span.innerText = `${remainingGuesses} guesses`;
    playAgain.classList.add("hide");
    remaining.classList.remove("hide");
    guessButton.classList.remove("hide");
    guesses.classList.remove("hide");
    getWord();
});
