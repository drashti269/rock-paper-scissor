import "./styles.css";

const game_start = document.querySelector(".start");
const scores = document.querySelectorAll(".score");
const computer_possible_move = document.querySelectorAll(".computer-move");
const user_possible_move = document.querySelectorAll(".user-move");
let count = 1;
let computerRank = 0;
let userRank = 0;

game_start.addEventListener("click", function (e) {
  resetGame();
  document.getElementById("result").innerHTML = "";
  document.getElementById("start_button").style.display = "none";
  document.getElementById("game_container").style.display = "flex";
});

user_possible_move.forEach((e) => {
  e.addEventListener("click", function () {
    handleClick(e.getAttribute("data-move"));
  });
});

function handleClick(user_move) {
  user_possible_move.forEach((move) => {
    const um = move.getAttribute("data-move");
    if (um === user_move) {
      move.classList.add("user-active");
    } else {
      move.classList.remove("user-active");
    }
  });

  const computer_move = computerMove();

  /// TIP:: Having a global state variable is bad practice

  if (computer_move === user_move) {
    count = count + 1;
    document.getElementById("round").innerHTML = "Round: " + count;
  } else {
    count = count + 1;
    document.getElementById("round").innerHTML = "Round: " + count;

    if (computer_move === "rock") {
      computerRank += 1;
    } else if (computer_move === "paper") {
      if (user_move === "rock") {
        computerRank += 1;
      } else if (user_move === "scissor") {
        userRank += 1;
      }
    } else if (computer_move === "scissor") {
      if (user_move === "rock") {
        userRank += 1;
      } else if (user_move === "paper") {
        computerRank += 1;
      }
    }
  }
  updateScore();
  if (userRank >= 5 || computerRank >= 5) {
    calculateResult();
  }
}

function computerMove() {
  const moves = ["rock", "paper", "scissor"];
  const computer_move = moves[Math.floor(Math.random() * moves.length)];

  computer_possible_move.forEach((move) => {
    const cm = move.getAttribute("data-move");
    if (cm === computer_move) {
      move.classList.add("computer-active");
    } else {
      move.classList.remove("computer-active");
    }
  });
  return computer_move;
}

function updateScore() {
  scores.forEach((element) => {
    const score_for = element.getAttribute("data-score");
    if (score_for === "computer") {
      element.innerHTML = computerRank;
    } else {
      element.innerHTML = userRank;
    }
  });
}

function calculateResult() {
  if (computerRank > userRank) {
    document.getElementById("result").innerHTML = "You lose!";
  } else if (computerRank < userRank) {
    document.getElementById("result").innerHTML = "You win!";
  } else {
    document.getElementById("result").innerHTML = "It's a draw!";
  }
  document.getElementById("game_container").style.display = "none";
  document.getElementById("start_button").style.display = "flex";
  document.getElementById("start_button").lastElementChild.innerHTML =
    "Restart Game";
}

function resetGame() {
  count = 1;
  computerRank = 0;
  userRank = 0;
  document.getElementById("round").innerHTML = "Round: " + count;
  updateScore();
  user_possible_move.forEach((e) => {
    e.classList.remove("user-active");
  });
  computer_possible_move.forEach((e) => {
    e.classList.remove("computer-active");
  });
}
