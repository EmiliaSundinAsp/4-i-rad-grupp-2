type BoardProps = {
  boardState: string[][];
  onCellClick: (column: number) => void;
  winningPositions: [number, number][];
};

const Board: React.FC<BoardProps> = ({ boardState, onCellClick, winningPositions }) => {
  return (
    <div className='game-board'>
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className='row'>
          {row.map((cell, colIndex) => {
            const isWinningPosition = winningPositions.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );

            let pieceClass = 'empty-piece'; // Standardklass för en tom cell.
            let borderClass = ''; // Standard för border (ingen border som standard).

            if (cell === 'X') {
              pieceClass = 'yellow-piece'; // X får gul färg.
              borderClass = isWinningPosition ? 'blinking-border-yellow' : ''; // Gul blinkande border om det är en vinnande pjäs.
            } else if (cell === 'O') {
              pieceClass = 'red-piece'; // O får röd färg.
              borderClass = isWinningPosition ? 'blinking-border-red' : ''; // Röd blinkande border om det är en vinnande pjäs.
            }

            return (
              <div
                key={colIndex}
                onClick={() => onCellClick(colIndex)}
                className={`cell`}
              >
                {/* Lägg till både bakgrundsfärg och border utan att radera färgen */}
                <div className={`piece ${pieceClass} ${borderClass}`} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
