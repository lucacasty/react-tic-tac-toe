function Square({value, winner, onSquareClick}) {

  const getBackground = () => {
    if(winner) {
      return "green";
    } else {
      return 'grey';
    }
  }

  return (
    <div
      className={`square winner-${winner}`}
      onClick={onSquareClick}
    >
      {value}
    </div>
  );
}

export default Square;
