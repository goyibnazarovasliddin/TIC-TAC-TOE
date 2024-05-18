document.addEventListener("DOMContentLoaded", () => {
  const boardElement = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  let board = Array(9).fill(null);
  const human = "X";
  const ai = "O";

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (board, player) => {
    return winningCombinations.some((combination) => {
      return combination.every((index) => board[index] === player);
    });
  };

  const checkTie = (board) => {
    return board.every((cell) => cell !== null);
  };

  const minimax = (board, depth, isMaximizing) => {
    if (checkWin(board, ai)) return 10 - depth;
    if (checkWin(board, human)) return depth - 10;
    if (checkTie(board)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = ai;
          let eval = minimax(board, depth + 1, false);
          board[i] = null;
          maxEval = Math.max(maxEval, eval);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = human;
          let eval = minimax(board, depth + 1, true);
          board[i] = null;
          minEval = Math.min(minEval, eval);
        }
      }
      return minEval;
    }
  };

  const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = ai;
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const makeMove = (index, player) => {
    if (board[index] === null) {
      board[index] = player;
      cells[index].innerText = player;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    board = Array(9).fill(null);
    cells.forEach((cell) => (cell.innerText = ""));
  };

  const handleClick = (event) => {
    const index = event.target.getAttribute("data-index");
    if (makeMove(index, human)) {
      if (checkWin(board, human)) {
        setTimeout(() => {
          alert("Yutdingiz!");
          resetBoard();
        }, 10);
      } else if (checkTie(board)) {
        setTimeout(() => {
          alert("Durang natija!");
          resetBoard();
        }, 10);
      } else {
        const aiMove = bestMove();
        makeMove(aiMove, ai);
        if (checkWin(board, ai)) {
          setTimeout(() => {
            alert("Yutqazdingiz!");
            resetBoard();
          }, 10);
        } else if (checkTie(board)) {
          setTimeout(() => {
            alert("Durang natija!");
            resetBoard();
          }, 10);
        }
      }
    }
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
});
