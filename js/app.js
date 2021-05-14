'use strict';
const message = document.querySelector('.head-section p');
const leftSide = document.querySelector('.left');
const rightSide = document.querySelector('.right');
const fields = document.querySelectorAll('.cell');
const gameboard = document.querySelector('.gameboard');
const reset = document.querySelector('.reset');
const restart = document.querySelector('.restart');
const switsh = document.querySelector('.switch');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const socre1 = document.querySelector('.score-1');
const socre2 = document.querySelector('.score-2');
const xrole = document.querySelector('.x');
const yrole = document.querySelector('.y');
console.log(socre1);

// ---------------------------------------------------
let turn = 'X';
let checked = [];
let checkedByPlayer;
let name1 = 'player1';
let name2 = 'player2';
// HELPING FUNCTIONS
// ---------------------------------------------------

const toggleRoles = function () {
  if (turn === 'X') turn = 'O';
  else turn = 'X';
};
const switchTurn = function () {
  toggleRoles();
  newTurn();
};

const newTurn = function () {
  rightSide.classList.toggle('active');
  leftSide.classList.toggle('active');
  message.innerHTML = `<span class="pink">${turn}'s</span> Turn`;
};

const Xicon = '<i class="fas fa-times blue"></i>';
const Oicon = '<i class="far fa-circle pink"></i>';
let currIcon;
let currPlayer;
const toggleIcon = function () {
  if (turn == 'X') {
    currIcon = Xicon;
  } else currIcon = Oicon;
};
const getPlayer = function () {
  if (turn == 'X') {
    if (player1.value) currPlayer = player1.value;
    else currPlayer = `Player 1`;
  } else if (player1.value) currPlayer = player2.value;
  else currPlayer = `Player 2`;
};
// MAIN FUNCTIONS
// -----------------------------------------------------
const placeItem = function (obj) {
  const cell = obj.srcElement;
  if (!cell.classList.contains('empty')) return;
  toggleIcon();
  cell.insertAdjacentHTML('beforeend', currIcon); // needs editing (adding the real image of X or by adding background img by CSS)
  cell.classList.remove('empty');
  cell.classList.add(turn);
  checked = [...fields].filter(
    field => !field.classList.contains('empty') // && field.classList.contains(turn)
  );
  checkedByPlayer = checked.filter(field => field.classList.contains(turn));
  if (checkWin()) {
    gaemover();
  }
};

const checkWin = function () {
  const checkedId = checkedByPlayer.map(field => `${field.id}`).sort();
  let sum = 0;
  getPlayer();
  // row check
  let rowCol = [];
  checkedId.forEach(n => {
    rowCol.push([Math.trunc(n / 3), n % 3]);
  });
  let row = [0, 0, 0];
  let col = [0, 0, 0];
  let diagnol = [];
  if (checkedId.length >= 3) {
    rowCol.forEach(item => {
      let [r, c] = item;
      row[r] += 1;
      col[c] += 1;
    });
    let a = row.find(i => i == 3);
    let b = col.find(i => i == 3);
    if (a == 3 || b == 3) {
      message.innerHTML = `${currPlayer} won`;

      return true;
    }
    let dig1 = checkedId.filter(i => i == 4 || i == 0 || i == 8);
    let dig2 = checkedId.filter(i => i == 4 || i == 2 || i == 6);

    if (dig1.length == 3 || dig2.length == 3) {
      message.innerHTML = `${currPlayer} won`;
      return true;
    }
  }
  switchTurn();
  return false;
};

const gaemover = function () {
  console.log(socre1);

  fields.forEach(field => field.classList.remove('empty'));
  if (turn == 'X') {
    socre1.innerHTML = `${parseInt(socre1.innerHTML) + 1}`;
  } else {
    socre2.innerHTML = `${parseInt(socre2.innerHTML) + 1}`;
  }
};

const restartFunction = function () {
  fields.forEach(field => {
    field.classList.remove(...['X', 'O']);
    field.classList.add(...['cell', 'empty']);
    field.innerHTML = '';
  });
  if (turn == 'O') newTurn();
  turn = 'X';
  message.textContent = `Ready to start!!`;
  checked = [];
  checkedByPlayer = [];
};

const resetFunction = function () {
  socre1.innerHTML = '0';
  socre2.innerHTML = '0';
  player1.value = '';
  player2.value = '';
  restartFunction();
};

const changeMessage = function (e) {
  let input = e.srcElement;
  if (input.classList.contains('player1')) {
    name1 = input.value;
  } else {
    name2 = input.value;
  }
};

// -----------------------------------------------------
// EVENT LISTENERS
fields.forEach(field => field.addEventListener('click', placeItem));
switsh.addEventListener('click', () => {
  if (!(checked.length == 0)) return;
  switchTurn();
});
restart.addEventListener('click', restartFunction);
reset.addEventListener('click', resetFunction);
[player1, player2].forEach(el =>
  el.addEventListener('focusout', changeMessage)
);
