let scoreDisplay = document.getElementById("scoreDisplay");
const grid = document.getElementById("grids");

let gameSquare = [];
let snake = [2, 1, 0];
let direction = 1;
let width = 10;
let movementSpeed = 1000;
let apple = 0;
let score = 0;
let speed = 0.9;

function createdGameGrids() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.append(square);
    gameSquare.push(square);
  }
  snake.forEach((index) => gameSquare[index].classList.add("snake"));
}
createdGameGrids();

function gameMovement() {
  if (
    (snake[0] % width === 0 && direction == -1) || //left border
    (snake[0] - width < 0 && direction == -width) || // up border
    (snake[0] % width == 9 && direction == 1) ||
    (snake[0] + width >= 100 && direction == +width) ||
    gameSquare[snake[0] + direction].classList.contains("snake")
  ) {
    return clearInterval(movement);
  }

  let tail = snake.pop();
  gameSquare[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);
  gameSquare[snake[0]].classList.add("snake");

  if (gameSquare[snake[0]].classList.contains("apple")) {
    gameSquare[snake[0]].classList.remove("apple");
    gameSquare[tail].classList.add("snake");
    snake.push(tail);
    gameApple();

    score++;
    scoreDisplay.textContent = score;

    clearInterval(movement);
    movementSpeed *= speed;
    movement = setInterval(gameMovement, movementSpeed);
  }
}

movement = setInterval(gameMovement, movementSpeed);

let left = 37,
  up = 38,
  right = 39,
  down = 40;

function arrow(e) {
  if (e.keyCode == 37) {
    direction = -1;
  } else if (e.keyCode == 38) {
    direction = -width;
  } else if (e.keyCode == 39) {
    direction = 1;
  } else if (e.keyCode == 40) {
    direction = width;
  } else {
    console.log("invalid key");
  }
}
document.addEventListener("keydown", arrow);

function gameApple() {
  do {
    apple = Math.floor(Math.random() * gameSquare.length);
  } while (gameSquare[apple].classList.contains("snake"));
  gameSquare[apple].classList.add("apple");
}
gameApple();
