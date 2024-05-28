
import Square from './Square';
import { useState } from 'react';

function Board({ xIsNext, squares, onPlay, winnerIndex, status}) {

  const board = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ]
   ];

  const handleClick = (i) => {
    console.log('inside')
    if (squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X";
    }
    else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    // calculateWinner(squares);
  }

  // const winner = calculateWinner(squares);
  // console.log(winner);
  // let status;
  // if (winner) {
  //   status = "Winner: " + winner;
  // } else {
  //   status = "Next player: " + (xIsNext ? "X" : "O");
  // }

  const renderSquare = (square) => {
    let winnerVal = false;
    if(winnerIndex.includes(square)) {
      winnerVal = true;
    }
    return (
      <>
        <Square key={`square-${square}`} value={squares[square]} winner={winnerVal} onSquareClick={() => handleClick(square)} />
      </>
    )
  }

  return (
    <>
      <div className="status">{status}</div>
      {board.map((row, i) => (
        <div key={i} className="board-row" vaore={status}>
          {row.map(square => renderSquare(square))}
        </div> 
      ))}
    </>
  );
}
export default Board;
