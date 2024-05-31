const board = document.getElementById("board");
const result = document.getElementById("result");
const turn = document.getElementById("turnBased");
const playerOne = document.getElementById("one");
const playerTwo = document.getElementById("two");
const section = document.getElementById("section");
const nav = document.getElementById("nav");
const ladder = [
  [[358, 500], [508, 450]],
  [[558, 500], [658, 400]],
  [[208, 400], [258, 300]],
  [[558, 400], [150, 408]],
  [[658, 300], [508, 200]],
  [[658, 150], [608, 50]],
  [[208, 150], [258, 50]],
];
const snake = [
  [[608, 350],[658, 500]],
  [[508, 350],[458, 500]],
  [[558, 300],[458, 400]],
  [[258, 200],[308, 450]],
  [[558, 100],[358, 400]],
  [[458, 50],[408, 250]],
  [[358, 50],[308, 150]],
];

createBoard();
function createBoard() {
  let a = 100;
  let dir = 1; // 1 -> ke kanan, 0 ke kiri
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      colorTile(i, j, cell);
      cell.innerText = a;
      cell.id = `${a}`;
      if (dir === 1) {
        if (j % 10 === 0) {
          dir = 0;
          a -= 10;
        } else {
          a--;
        }
      } else if (dir === 0) {
        if (j % 10 === 0) {
          dir = 1;
          a -= 10;
        } else {
          a++;
        }
      }
      board.appendChild(cell);
    }
  }
}
function colorTile(i, j, cell) {
  if (i % 2 !== 0 && j % 2 !== 0) {
    cell.style.backgroundColor = "white";
    cell.style.color = "black";
  } else if (i % 2 === 0 && j % 2 == 0) {
    cell.style.backgroundColor = "white";
    cell.style.color = "black";
  }
}
let change = true;
function rollDice() {
  const rng = Math.floor(Math.random() * 6 + 1);
  const rng2 = Math.floor(Math.random() * 6 + 1);
  const move = rng + rng2;
  result.innerText = `move = ${move}  dice1 = ${rng}  dice2 = ${rng2}`;
  if (change) {
    change = false;
    turn.innerText = "Y";
    movePlayerOne(move);
  } else {
    change = true;
    turn.innerText = "X";
    movePlayerTwo(move);
  }
}

// TODO: playermovement
let xOne = 0;
let xTwo = 0;
let yOne = 0;
let yTwo = 0;
let xDirOne = 1;
let xDirTwo = 1;
let yDirOne = -1;
let yDirTwo = -1;
let counterOne = 1; // tile location for player One
let counterTwo = 1; // tile location for player Two
function movePlayerOne(step) {
  xOne = parseInt(playerOne.offsetLeft);
  yOne = parseInt(playerOne.offsetTop);
  for (let i = 0; i < step; i++) {
    if (counterOne % 10 === 0 && counterOne !== 0) {
      yOne -= 50;
      xDirOne *= -1;
    } else {
      xOne += 50 * xDirOne;
    }
    // console.log(counter);
    counterOne++;
  }
  gameOver(counterOne, playerOne);
  playerOne.style.left = `${xOne}px`;
  playerOne.style.top = `${yOne}px`;
  console.log(counterOne);
  console.log(xOne, yOne);
  checkSnake(playerOne, xOne, yOne);
  checkLadder(playerOne, xOne, yOne);
}
function movePlayerTwo(step) {
  xTwo = parseInt(playerTwo.offsetLeft);
  yTwo = parseInt(playerTwo.offsetTop);
  for (let i = 0; i < step; i++) {
    if (counterTwo % 10 === 0 && counterTwo !== 0) {
      yTwo -= 50;
      xDirTwo *= -1;
    } else {
      xTwo += 50 * xDirTwo;
    }
    // console.log(counter);
    counterTwo++;
  }
  gameOver(counterTwo, playerTwo);
  playerTwo.style.left = `${xTwo}px`;
  playerTwo.style.top = `${yTwo}px`;
  checkSnake(playerTwo, xTwo, yTwo);
  checkLadder(playerTwo, xTwo, yTwo);
}
// Game over mechanism connected to moveplayer() function
function gameOver(counter, player) {
  if (counter >= 99 && player.id === "one") {
    window.alert("game finished, player one wins");
    playerOne.style.display = "none";
  } else if (counter >= 99 && player.id === "two") {
    window.alert("game finished, player two wins");
    playerTwo.style.display = "none";
  }
}

// tile location = counterOne (player One) or counterTwo (player Two)
function checkSnake(player, x, y){
  console.log('tes snake');
  if(player.id === 'one'){
    y += 10;
  } else if(player.id === 'two'){
    y -= 10;
  }
  console.log(x,y, player.id);
  snake.forEach(elem => {
    if (elem[0][0] === x && elem[0][1] === y) {
      console.log('snake detected'); 
      setTimeout(() => {
        player.style.left = `${elem[1][0]}px`;
        player.style.top = `${elem[1][1]}px`;
      }, 3000);
    }
  })
}
function checkLadder(player, x, y){
  console.log('tes ladder');
  if(player.id === 'one'){
    y += 10;
  } else if(player.id === 'two'){
    y -= 10;
  }
  console.log(x,y, player.id);
  ladder.forEach(elem => {
    if (elem[0][0] === x && elem[0][1] === y) {
      console.log('ladder detected');
      setTimeout(() => {
        player.style.left = `${elem[1][0]}px`;
        player.style.top = `${elem[1][1]}px`;
      }, 3000);
    }
  })
}