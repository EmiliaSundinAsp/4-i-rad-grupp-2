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
          {row.map((piece, colIndex) => {
            const isWinningPosition = winningPositions.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );

            let pieceClass = 'empty-piece'; // Standardklass för en tom cell.
            let borderClass = ''; // Standard för border (ingen border som standard).

            if (piece === 'X') {
              pieceClass = 'yellow-piece'; // X får gul färg.
              borderClass = isWinningPosition ? 'blinking-border-yellow' : ''; // Gul blinkande border om det är en vinnande pjäs.
            } else if (piece === 'O') {
              pieceClass = 'red-piece'; // O får röd färg.
              borderClass = isWinningPosition ? 'blinking-border-red' : ''; // Röd blinkande border om det är en vinnande pjäs.
            }

            return (
              <div
                key={colIndex}
                onClick={() => onCellClick(colIndex)}
                className={`piece`}
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
