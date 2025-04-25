const animals = [
  // Land animals (15)
  { word: "elephant", type: "land" },
  { word: "tiger", type: "land" },
  { word: "lion", type: "land" },
  { word: "giraffe", type: "land" },
  { word: "zebra", type: "land" },
  { word: "rhino", type: "land" },
  { word: "cheetah", type: "land" },
  { word: "panda", type: "land" },
  { word: "kangaroo", type: "land" },
  { word: "bear", type: "land" },
  { word: "deer", type: "land" },
  { word: "wolf", type: "land" },
  { word: "fox", type: "land" },
  { word: "goat", type: "land" },
  { word: "camel", type: "land" },

  // Water animals (10)
  { word: "shark", type: "water" },
  { word: "whale", type: "water" },
  { word: "dolphin", type: "water" },
  { word: "octopus", type: "water" },
  { word: "seal", type: "water" },
  { word: "lobster", type: "water" },
  { word: "crab", type: "water" },
  { word: "turtle", type: "water" },
  { word: "jellyfish", type: "water" },
  { word: "stingray", type: "water" },

  // Air animals (5)
  { word: "eagle", type: "air" },
  { word: "owl", type: "air" },
  { word: "parrot", type: "air" },
  { word: "falcon", type: "air" },
  { word: "pigeon", type: "air" }
];

let secretAnimal;
let attemptsLeft = 5;
let gameOver = false;

const clue = document.getElementById("clue");
const message = document.getElementById("message");
const input = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");

function randomAnimal() {
  const index = Math.floor(Math.random() * animals.length);
  return animals[index];
}

function setClue(animal) {
  clue.innerHTML = `Clue: It's a <strong>${animal.type}</strong> animal. 
    First letter is <strong>${animal.word[0].toUpperCase()}</strong>.`;
}

function endGame(win) {
  gameOver = true;
  submitBtn.disabled = true;
  restartBtn.style.display = "inline-block";
  if (!win) {
    message.innerHTML = `Game Over! The correct animal was <strong>${secretAnimal.word}</strong>.`;
  }
}

function startGame() {
  secretAnimal = randomAnimal();
  attemptsLeft = 5;
  gameOver = false;
  input.value = "";
  message.textContent = "";
  submitBtn.disabled = false;
  restartBtn.style.display = "none";
  document.body.style.backgroundColor = "#f4f4f4";
  setClue(secretAnimal);
  console.log("Secret animal:", secretAnimal.word); // for testing
}

submitBtn.addEventListener("click", () => {
  if (gameOver) return;

  const guess = input.value.trim().toLowerCase();

  if (!guess) {
    message.textContent = "Please enter a valid guess.";
    return;
  }

  if (guess === secretAnimal.word) {
    message.textContent = "Congratulations! You guessed it!";
    document.body.style.backgroundColor = "#c8f7c5"; // green
    endGame(true);
  } else {
    attemptsLeft--;
    document.body.style.backgroundColor = "#f8d7da"; // red
    if (attemptsLeft > 0) {
      message.textContent = `Incorrect. You have ${attemptsLeft} attempt(s) left.`;
    } else {
      endGame(false);
    }
  }

  input.value = "";
  input.focus();
});

restartBtn.addEventListener("click", startGame);
window.onload = startGame;

input.addEventListener("keydown",
  function(event){
    if(event.key === "Enter"){
      submitBtn.click();
    }
  });
