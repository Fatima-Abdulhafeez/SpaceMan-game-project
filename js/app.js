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
let timeLeft = 60;
let countdown;

/*----- Cached Element References  -----*/
const hintText = document.getElementById("hint");
const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-button");
const worngCount = document.getElementById("worngCount");
const resultMassage = document.getElementById("result-massage");
const restartBtn = document.getElementById("restrtBtn");
const timer = document.getElementById("timer");
const startbtn = document.getElementById("startbtn");
const image = document.getElementById("image");
const wrongGs= document.getElementById("wg");
/*-------------- Functions -------------*/
function init(){
    const random = words[Math.floor(Math.random()* words.length)];
    selectWord = random.word.toUpperCase();
    guessedLetters=[];
    wrongGuesses=0;
    resultMassage.textContent="";
    hintText.textContent = `💡 Hint : ${random.hint}`
    worngCount.textContent=wrongGuesses;
    timeLeft =60;
    image.src="./assets/spaceman.gif";
    resultMassage.classList.add("hidden");
    restartBtn.classList.add("hidden");
    startbtn.classList.add("hidden");
    wrongGs.classList.remove("hidden");
    timer.textContent = `Time Left: ${timeLeft}s`;
    countdown = setInterval(()=>{
        timeLeft--;
        timer.textContent = `⌛ Time Left: ${timeLeft}s`;
        if(timeLeft <=0){
            clearInterval(countdown);
            resultMassage.textContent= "Time's up 💣 ! You Lost!";
            resultMassage.classList.remove("hidden");
            image.src="./assets/lost.gif";
            endGame();
        }
    },1000)

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
    resultMassage.textContent="You saved the spaceman!";
    resultMassage.classList.remove("hidden");
    image.src="./assets/win.gif";
    endGame();
 }
}

function checkLoss(){
    if(wrongGuesses>=maxWrong){
        resultMassage.textContent=`Game Is over! The Word is ${selectWord} `;
        resultMassage.classList.remove("hidden");
        image.src="./assets/lost.gif";
        endGame();
    }
}
function endGame(){
    document.querySelectorAll('#letter-button button').forEach(
        btn => btn.disabled = true);
        restartBtn.classList.remove("hidden");
        clearInterval(countdown);
        
}

/*----------- Event Listeners ----------*/
restartBtn.addEventListener("click",init);
startbtn.addEventListener("click",init);
