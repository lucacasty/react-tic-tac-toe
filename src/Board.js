
import Square from './Square';

function Board({ xIsNext, squares, onPlay }) {

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
        return squares[a];
      }
    }
    return null;
  }

  const board = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ]
   ];

  const handleClick = (i) => {

    if (squares[i] || calculateWinner(squares)) {
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
  }

  const winner = calculateWinner(squares);
  console.log(winner);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const renderSquare = (square) => {
    return (
      <>
        <Square key={`square-${square}`} value={squares[square]} onSquareClick={() => handleClick(square)} />
      </>
    )
  }

  return (
    <>
      <div className="status">{status}</div>
      {board.map((row, i) => (
        <div key={i} className="board-row">
          {row.map(square => renderSquare(square))}
        </div> 
      ))}
    </>
  );
}
export default Board;
