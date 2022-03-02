const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letter = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingSpan = document.querySelector("span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

//Function to update words-in-progress
const guessWord = function (theWord) {
    const lettersList = [];
    for (const item of word) {
        lettersList.push("●");
    }
    wordInProgress.innerText = lettersList.join("");
    return wordInProgress;
};

guessWord(word);

//Event Listener on button
guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const userGuess = letter.value;
    //console.log(userGuess);
    letter.value = "";
});