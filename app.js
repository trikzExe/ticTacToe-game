const editButtons = document.querySelectorAll(".edit");
const overlay = document.querySelector("aside");
const cancelButton = document.getElementById("cancel");
const formElement = document.querySelector("form");
const playerCards = document.querySelectorAll(".player-cards");
const palleteElement = document.getElementById("pallete");
const palletes = document.querySelectorAll("#pallete button");
const playerCardsContainer = document.getElementById("player-cards-container");

const newGameButton = document.getElementById("new-game");
const headerElement = document.querySelector("header");
const gameContainer = document.getElementById("game-container");
const playerTurn = document.getElementById("player-turn");
const winContainer = document.getElementById("win-container");

let whitchButton = -1;

let whoIsGoing = 1;

let gameCoordinates = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const namesList = [
  {
    name: "",
    value: "X",
  },
  {
    name: "",
    value: "O",
  },
];

let stepsCounter = 0;

function asideOpener(event) {
  overlay.style.display = "block";
  const buttonsList = Array.from(editButtons);
  const indexOfButton = buttonsList.indexOf(event.target);
  whitchButton = indexOfButton;
  console.log(indexOfButton);
}

function asideCloser() {
  overlay.style.display = "none";
  formElement.children[2].value = "";
  whitchButton = -1;
}

function sumbitTheName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredName = formData.get("player-name").trim();
  if (enteredName) {
    playerCards[whitchButton].children[1].textContent = enteredName;
    namesList[whitchButton].name = enteredName;
    overlay.style.display = "none";
    event.target.children[2].value = "";
  } else {
    alert("Please enter the name");
  }
}

function newGameStarter() {
  if (!namesList[0].name || !namesList[1].name) {
    alert("please, enter the names");
  } else {
    headerElement.style.display = "none";
    gameContainer.style.display = "block";
    playerCardsContainer.style.display = "none";
    palletes.forEach(function (element) {
      element.textContent = "";
      gameCoordinates = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    });
    playerTurn.textContent = namesList[0].name;
    winContainer.style.display = "none";
    whoIsGoing = 1;
    stepsCounter = 0;
  }
}

function whoIsGoingChecker(event) {
  if (!event.target.textContent) {
    if (whoIsGoing === 1) {
      event.target.textContent = "X";
      whoIsGoing = 2;
      playerTurn.textContent = namesList[1].name;
      const selectedColumn = event.target.dataset.column;
      const selectedRow = event.target.dataset.row;
      gameCoordinates[selectedRow][selectedColumn] = 1;
      console.log(gameCoordinates);
    } else {
      event.target.textContent = "O";
      whoIsGoing = 1;
      playerTurn.textContent = namesList[0].name;
      const selectedColumn = event.target.dataset.column;
      const selectedRow = event.target.dataset.row;
      gameCoordinates[selectedRow][selectedColumn] = 2;
    }
  }
  if (
    (gameCoordinates[0][0] === 1 &&
      gameCoordinates[0][1] === 1 &&
      gameCoordinates[0][2] === 1) ||
    (gameCoordinates[1][0] === 1 &&
      gameCoordinates[1][1] === 1 &&
      gameCoordinates[1][2] === 1) ||
    (gameCoordinates[2][0] === 1 &&
      gameCoordinates[2][1] === 1 &&
      gameCoordinates[2][2] === 1) ||
    (gameCoordinates[0][0] === 1 &&
      gameCoordinates[1][0] === 1 &&
      gameCoordinates[2][0] === 1) ||
    (gameCoordinates[0][1] === 1 &&
      gameCoordinates[1][1] === 1 &&
      gameCoordinates[2][1] === 1) ||
    (gameCoordinates[0][2] === 1 &&
      gameCoordinates[1][2] === 1 &&
      gameCoordinates[2][2] === 1) ||
    (gameCoordinates[0][0] === 1 &&
      gameCoordinates[1][1] === 1 &&
      gameCoordinates[2][2] === 1) ||
    (gameCoordinates[0][2] === 1 &&
      gameCoordinates[1][1] === 1 &&
      gameCoordinates[2][0] === 1)
  ) {
    gameContainer.style.display = "none";
    winContainer.style.display = "block";
    winContainer.children[0].children[0].textContent =
      "You won, " + namesList[0].name;
    headerElement.style.display = "block";
    playerCardsContainer.style.display = "flex";
  } else if (
    (gameCoordinates[0][0] === 2 &&
      gameCoordinates[0][1] === 2 &&
      gameCoordinates[0][2] === 2) ||
    (gameCoordinates[1][0] === 2 &&
      gameCoordinates[1][1] === 2 &&
      gameCoordinates[1][2] === 2) ||
    (gameCoordinates[2][0] === 2 &&
      gameCoordinates[2][1] === 2 &&
      gameCoordinates[2][2] === 2) ||
    (gameCoordinates[0][0] === 2 &&
      gameCoordinates[1][0] === 2 &&
      gameCoordinates[2][0] === 2) ||
    (gameCoordinates[0][1] === 2 &&
      gameCoordinates[1][1] === 2 &&
      gameCoordinates[2][1] === 2) ||
    (gameCoordinates[0][2] === 2 &&
      gameCoordinates[1][2] === 2 &&
      gameCoordinates[2][2] === 2) ||
    (gameCoordinates[0][0] === 2 &&
      gameCoordinates[1][1] === 2 &&
      gameCoordinates[2][2] === 2) ||
    (gameCoordinates[0][2] === 2 &&
      gameCoordinates[1][1] === 2 &&
      gameCoordinates[2][0] === 2)
  ) {
    gameContainer.style.display = "none";
    winContainer.style.display = "block";
    winContainer.children[0].children[0].textContent =
      "You won, " + namesList[1].name;
    headerElement.style.display = "block";
    playerCardsContainer.style.display = "flex";
  }
  stepsCounter++;
  if (stepsCounter === 9) {
    gameContainer.style.display = "none";
    winContainer.style.display = "block";
    winContainer.children[0].children[0].textContent = "DRAW!!";
    headerElement.style.display = "block";
    playerCardsContainer.style.display = "flex";
  }
}

editButtons.forEach(function (button) {
  button.addEventListener("click", asideOpener);
});

cancelButton.addEventListener("click", asideCloser);
formElement.addEventListener("submit", sumbitTheName);

newGameButton.addEventListener("click", newGameStarter);

palletes.forEach(function (button) {
  button.addEventListener("click", whoIsGoingChecker);
});

// function triangleInConsole() {
//   let zvezdochka = "";
//   for (let i = 5; i > 0; i--) {
//     for (let x = i; x > 0; x--) {
//       zvezdochka += "*";
//     }
//     console.log(zvezdochka);
//     zvezdochka = "";
//   }

// }

// triangleInConsole();
