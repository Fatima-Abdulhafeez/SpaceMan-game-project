/*-------------- Constants -------------*/
const words = [
    { word:"planet" , hint: "A large object orbiting a star " },
    { word: "spaceship" , hint: "Used for interstellar travel" }, 
    {word: "galaxy" , hint:" A large group of big stars"}
]

/*---------- Variables (state) ---------*/
let selectWord= "";
let guessedLetters =[];
let wrongGuesses=0;
const maxWrong =6;

/*----- Cached Element References  -----*/
const hintText = document.getElementById("hint");
const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-button");
const worngCount = document.getElementById("worngCount");
const resultMassage = document.getElementById("result-massage");
const restartBtn = document.getElementById("restrtBtn");

/*-------------- Functions -------------*/
function init(){
    const random = words[Math.floor(Math.random()* words.length)];
    selectWord = random.word.toUpperCase();
    guessedLetters=[];
    wrongGuesses=0;
    resultMassage.textContent="";
    hintText.textContent = `Hint: ${random.hint}`
    worngCount.textContent=wrongGuesses;
    resultMassage.classList.add("hidden");
    restartBtn.classList.add("hidden");
    generateWordDisplay();
    generateButtons();
}

function generateWordDisplay(){
    wordDisplay.innerHTML="";
    selectWord.split("").forEach(letter=>{
         const span = document.createElement("span");
         if(guessedLetters.includes(letter)){
           span.textContent=letter;
         }
         else{
           span.textContent="-";
         }
        span.classList.add("letter-box");
        wordDisplay.appendChild(span);
    })}
    


function generateButtons(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    letterButtons.innerHTML="";

    for (let letter of alphabet){
        const btn = document.createElement("button");
        btn.textContent =letter;
        btn.addEventListener("click",()=>handleGuess(letter, btn));
        letterButtons.appendChild(btn);
    }

}
function handleGuess(letter,btn){
 btn.disabled = true;
 if (selectWord.includes(letter)){
    guessedLetters.push(letter);
    generateWordDisplay();
    checkWin();
}
else{
    wrongGuesses++;
    worngCount.textContent=wrongGuesses;
    checkLoss();
}
}

function checkWin(){
 let allGuessed = true;

 for(let letter of selectWord){
    if(!guessedLetters.includes(letter)){
        allGuessed = false;
        break;
    }
 }
 if(allGuessed){
    resultMassage.textContent="you saved th spaceman!";
    resultMassage.classList.remove("hidden");
    endGame();
 }
}

function checkLoss(){
    if(wrongGuesses>=maxWrong){
        resultMassage.textContent="Game Is over! The Spaceman is lost in the space :( ";
        resultMassage.classList.remove("hidden");
        endGame();
    }
}
function endGame(){
    document.querySelectorAll('#letter-button button').forEach(
        btn => btn.disabled = true);
        restartBtn.classList.remove("hidden");
}

/*----------- Event Listeners ----------*/
restartBtn.addEventListener("click",init);

init()