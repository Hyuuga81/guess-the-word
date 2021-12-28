const guessedLetters = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const makeWord = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const guessNumber = document.querySelector("span");
const message = document.querySelector(".message");
const resetButton = document.querySelector(".play-again");
const word = "magnolia";

button.addEventListener("click", function(e) {
    e.preventDefault;
    const letterValue = letterInput.value;
    console.log(letterValue);
    clearInput();
});

//function to put circles in place of word in progress letters
const letterHolders = function (word) {
    if (word !== "") {
        /*separate word into elements of array*/
        let words = word.split("");  //assign the array to words

        /* for each element replace letter with circle */
        for (let i = 0; i < words.length; i++) {
            words[i] = "●";
        }
        //join the array back together and replace existing array
        words = words.join("");
        makeWord.innerText = words; //make array innertext of p
    }
    
};

//function to clear input 
const clearInput = function () {
    letterInput.value = "";
}

letterHolders(word);