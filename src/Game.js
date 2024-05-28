import Board from './Board';
import { useState } from 'react';

function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winnerIndex, setWinnerIndex] = useState([]);
  const [statusWin, setStatusWin] = useState();
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handleWin = (a,b,c) => {
    // const winnerIndexTmp = winnerIndex.slice();
    // winnerIndexTmp.push(a,b,c);
    setWinnerIndex([a,b,c]);
  }

  function handlePlay(nextSquares) {
    if(winnerIndex.length > 0) {
      return;
    }

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const newCurrentMove = nextHistory.length - 1;
    setHistory(nextHistory);
    setCurrentMove(newCurrentMove);

    // after updating squares we should check if it's a win
    const win = calculateWinner(nextHistory[newCurrentMove]);
    let status;
    if (win) {
      status = "Winner: " + win;
    } else {
      status = "Next player: " + (newCurrentMove % 2 === 0 ? "X" : "O");
    }
    setStatusWin(status);
  }

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log('set array of winner in state');
        handleWin(a,b,c);
        return squares[a];
      }
    }
    return null;
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setWinnerIndex([]);
  }

  const moves = history.map((squares, move) => {
    console.log(move+': '+history);
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winnerIndex={winnerIndex} status={statusWin}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>  
      </div>
    </div>
  );
}

export default Game;