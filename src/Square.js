function Square({value, onSquareClick, winner}) {

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
