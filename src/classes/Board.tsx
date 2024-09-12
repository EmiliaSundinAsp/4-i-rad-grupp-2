type BoardProps = {
  boardState: string[][];
  onCellClick: (column: number) => void;
};

const Board: React.FC<BoardProps> = ({ boardState, onCellClick }) => {
  return (
    <div className='game-board'>
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => onCellClick(colIndex)}
              className='cell'
            >
              <div
                className={`piece ${cell === 'X' ? 'yellow-piece' : cell === 'O' ? 'red-piece' : 'empty-piece'}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;