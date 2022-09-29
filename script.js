const pole = `♜♞♝♛♚♝♞♜♟♟♟♟♟♟♟♟${" ".repeat(32)}♙♙♙♙♙♙♙♙♖♘♗♕♔♗♘♖`.split("");
const doska = document.querySelector(".doska");

let count = 0;
let i1 = -1;
let i2 = -1;
let whiteMove = true;
let axisX = 0;
let axisY = 0;
let whiteСastling = true;
let blackСastling = true;
let whiteRookMove = { l: false, r: false };
let blackRookMove = { l: false, r: false };
let whiteCheck = false;
let blackCheck = false;

hod();
function hod() {
  castlingFalse();

  doska.innerHTML = pole
    .map((e, i) => {
      if (i % 8 === 0) {
        count--;
      }
      count++;
      let cvet = "";
      count % 2 ? (cvet = `black`) : (cvet = `white`);
      return `<div class="${
        cvet + (e === " " ? " pustoy" : " figura " + e)
      }"  id="${i}">${e}</div>`;
    })
    .join("");
}

doska.addEventListener("click", (e) => {
  if (/shadow/.test(e.target.className)) {
    i2 = +e.target.id;
    if (whiteСastling || blackСastling) {
      castling();
    }
    pole[i2] = pole[i1];
    pole[i1] = " ";
    hod();
    whiteMove = !whiteMove;
    shadowClear();
    return;
  }
  shadowClear();

  i1 = +e.target.id;
  axisX = Math.floor(i1 / 8);
  axisY = i1 % 8;

  if (/[♔-♟]/.test(pole[i1])) {
    moves();
  }
});
function castlingFalse() {
  if (i1 === 60) {
    whiteСastling = false;
    return;
  }
  if (i1 === 4) {
    blackСastling = false;
    return;
  }
  if (i1 === 56) {
    whiteRookMove.l = true;
    if (whiteRookMove.l && whiteRookMove.r) {
      whiteСastling = false;
    }
    return;
  }
  if (i1 === 63) {
    whiteRookMove.r = true;
    if (whiteRookMove.l && whiteRookMove.r) {
      whiteСastling = false;
    }
    return;
  }
  if (i1 === 0) {
    blackRookMove.l = true;
    if (blackRookMove.l && blackRookMove.r) {
      blackСastling = false;
    }
    return;
  }
  if (i1 === 7) {
    blackRookMove.r = true;
    if (blackRookMove.l && blackRookMove.r) {
      blackСastling = false;
    }
    return;
  }
}
function castling() {
  if (i1 === 60 && i2 === 58 && pole[i1] === "♔") {
    pole[59] = "♖";
    pole[56] = " ";
    return;
  }
  if (i1 === 60 && i2 === 62 && pole[i1] === "♔") {
    pole[61] = "♖";
    pole[63] = " ";
    return;
  }
  if (i1 === 4 && i2 === 2 && pole[i1] === "♚") {
    pole[3] = "♖";
    pole[0] = " ";
    return;
  }
  if (i1 === 4 && i2 === 6 && pole[i1] === "♚") {
    pole[5] = "♖";
    pole[7] = " ";
    return;
  }
}
function shadowClear() {
  Array.from(document.getElementsByClassName("shadow")).forEach(
    (e) => (e.className = e.className.replace("shadow", ""))
  );
}
function moves() {
  const cvet = [];
  if (whiteMove) {
    cvet.push("♙", "♖", "♘", "♗", "♕", "♔");
  } else {
    cvet.push("♟", "♜", "♞", "♝", "♛", "♚");
  }
  const moves = [];
  switch (pole[i1]) {
    case cvet[0]:
      if (whiteMove) {
        if (/[♚-♟]/.test(pole[i1 - 7])) {
          moves.push(i1 - 7);
        }
        if (/[♚-♟]/.test(pole[i1 - 9])) {
          moves.push(i1 - 9);
        }
        if (!/[♔-♟]/.test(pole[i1 - 8])) {
          moves.push(i1 - 8);
        }
        if (
          !/[♔-♟]/.test(pole[i1 - 16]) &&
          !/[♔-♟]/.test(pole[i1 - 8]) &&
          i1 > 47 &&
          i1 < 56
        ) {
          moves.push(i1 - 16);
        }
      } else {
        if (/[♔-♙]/.test(pole[i1 + 7])) {
          moves.push(+i1 + 7);
        }
        if (/[♔-♙]/.test(pole[i1 + 9])) {
          moves.push(+i1 + 9);
        }
        if (!/[♔-♟]/.test(pole[i1 + 8])) {
          moves.push(i1 + 8);
        }
        if (
          !/[♔-♟]/.test(pole[i1 + 16]) &&
          !/[♔-♟]/.test(pole[i1 + 8]) &&
          i1 > 7 &&
          i1 < 16
        ) {
          moves.push(i1 + 16);
        }
      }
      break;
    case cvet[1]:
      for (let i = 1; i < 8; i++) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if (Math.floor((i1 - i) / 8) === axisX) {
            moves.push(i1 - i);
          }
          break;
        }
        if (Math.floor((i1 - i) / 8) === axisX) {
          moves.push(i1 - i);
        }
      }
      for (let i = 1; i < 8; i++) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if (Math.floor((i1 + i) / 8) === axisX) {
            moves.push(i1 + i);
          }
          break;
        }
        if (Math.floor((i1 + i) / 8) === axisX) {
          moves.push(i1 + i);
        }
      }
      for (let i = 8; i < 56; i += 8) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if ((i1 - i) % 8 === axisY) {
            moves.push(i1 - i);
          }
          break;
        }
        if ((i1 - i) % 8 === axisY) {
          moves.push(i1 - i);
        }
      }
      for (let i = 8; i < 56; i += 8) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if ((i1 + i) % 8 === axisY) {
            moves.push(i1 + i);
          }
          break;
        }
        if ((i1 + i) % 8 === axisY) {
          moves.push(i1 + i);
        }
      }

      break;
    case cvet[2]:
      moves.push(
        (i1 - 6) % 8 === axisY + 2 ? i1 - 6 : -1,
        (i1 + 6) % 8 === axisY - 2 ? i1 + 6 : -1,
        (i1 + 10) % 8 === axisY + 2 ? i1 + 10 : -1,
        (i1 - 10) % 8 === axisY - 2 ? i1 - 10 : -1,
        (i1 + 15) % 8 === axisY - 1 ? i1 + 15 : -1,
        (i1 - 15) % 8 === axisY + 1 ? i1 - 15 : -1,
        (i1 + 17) % 8 === axisY + 1 ? i1 + 17 : -1,
        (i1 - 17) % 8 === axisY - 1 ? i1 - 17 : -1
      );
      break;
    case cvet[3]:
      for (let i = 7; i < 56; i += 7) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if ((i1 - i) % 8 > axisY) {
            moves.push(i1 - i);
          }
          break;
        }
        if ((i1 - i) % 8 > axisY) {
          moves.push(i1 - i);
        }
      }
      for (let i = 7; i < 56; i += 7) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if ((i1 + i) % 8 < axisY) {
            moves.push(i1 + i);
          }
          break;
        }
        if ((i1 + i) % 8 < axisY) {
          moves.push(i1 + i);
        }
      }
      for (let i = 9; i < 64; i += 9) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if ((i1 + i) % 8 > axisY) {
            moves.push(i1 + i);
          }
          break;
        }
        if ((i1 + i) % 8 > axisY) {
          moves.push(i1 + i);
        }
      }
      for (let i = 9; i < 64; i += 9) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if ((i1 - i) % 8 < axisY) {
            moves.push(i1 - i);
          }
          break;
        }
        if ((i1 - i) % 8 < axisY) {
          moves.push(i1 - i);
        }
      }
      break;
    case cvet[4]:
      for (let i = 1; i < 8; i++) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if (Math.floor((i1 - i) / 8) === axisX) {
            moves.push(i1 - i);
          }
          break;
        }
        if (Math.floor((i1 - i) / 8) === axisX) {
          moves.push(i1 - i);
        }
      }
      for (let i = 1; i < 8; i++) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if (Math.floor((i1 + i) / 8) === axisX) {
            moves.push(i1 + i);
          }
          break;
        }
        if (Math.floor((i1 + i) / 8) === axisX) {
          moves.push(i1 + i);
        }
      }
      for (let i = 8; i < 56; i += 8) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if ((i1 - i) % 8 === axisY) {
            moves.push(i1 - i);
          }
          break;
        }
        if ((i1 - i) % 8 === axisY) {
          moves.push(i1 - i);
        }
      }
      for (let i = 8; i < 56; i += 8) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if ((i1 + i) % 8 === axisY) {
            moves.push(i1 + i);
          }
          break;
        }
        if ((i1 + i) % 8 === axisY) {
          moves.push(i1 + i);
        }
      }

      for (let i = 7; i < 56; i += 7) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if ((i1 - i) % 8 > axisY) {
            moves.push(i1 - i);
          }
          break;
        }
        if ((i1 - i) % 8 > axisY) {
          moves.push(i1 - i);
        }
      }
      for (let i = 7; i < 56; i += 7) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if ((i1 + i) % 8 < axisY) {
            moves.push(i1 + i);
          }
          break;
        }
        if ((i1 + i) % 8 < axisY) {
          moves.push(i1 + i);
        }
      }
      for (let i = 9; i < 64; i += 9) {
        if (/[♔-♟]/.test(pole[i1 + i])) {
          if ((i1 + i) % 8 > axisY) {
            moves.push(i1 + i);
          }
          break;
        }
        if ((i1 + i) % 8 > axisY) {
          moves.push(i1 + i);
        }
      }
      for (let i = 9; i < 64; i += 9) {
        if (/[♔-♟]/.test(pole[i1 - i])) {
          if ((i1 - i) % 8 < axisY) {
            moves.push(i1 - i);
          }
          break;
        }
        if ((i1 - i) % 8 < axisY) {
          moves.push(i1 - i);
        }
      }
      break;
    case cvet[5]:
      if (i1 === 60 && whiteСastling && !whiteCheck) {
        if (
          !whiteRookMove.l &&
          [pole[57], pole[58], pole[59]].every((e) => e === " ")
        ) {
          moves.push(58);
        }
        if (!whiteRookMove.r && pole[61] === " " && pole[62] === " ") {
          moves.push(62);
        }
      }
      if (i1 === 4 && blackСastling && !blackCheck) {
        if (
          !blackRookMove.l &&
          [pole[1], pole[2], pole[3]].every((e) => e === " ")
        ) {
          moves.push(2);
        }
        if (!whiteRookMove.r && pole[5] === " " && pole[6] === " ") {
          moves.push(6);
        }
      }
      moves.push(i1 + 8, i1 - 8);
      if (axisY + 1 === (i1 + 1) % 8) {
        moves.push(i1 + 1);
      }
      if (axisY - 1 === (i1 - 1) % 8) {
        moves.push(i1 - 1);
      }
      if (axisY - 1 === (i1 - 9) % 8) {
        moves.push(i1 - 9);
      }
      if (axisY + 1 === (i1 + 9) % 8) {
        moves.push(i1 + 9);
      }
      if (axisY - 1 === (i1 + 7) % 8) {
        moves.push(i1 + 7);
      }
      if (axisY + 1 === (i1 - 7) % 8) {
        moves.push(i1 - 7);
      }

      break;
  }
  if (!moves.length) {
    return;
  }
  moves.forEach((e) => {
    if (!cvet.includes(pole[e]) && e > -1 && e < 64) {
      document.getElementById(e).className += " shadow";
    }
  });
}
