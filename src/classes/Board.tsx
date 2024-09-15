type BoardProps = {
  boardState: string[][];
  onCellClick: (column: number) => void;
  winningPositions: [number, number][];
  errorMessage?: string;
};

const Board: React.FC<BoardProps> = ({
  boardState,
  onCellClick,
  winningPositions,
  errorMessage,
}) => {
  return (
    <div className="game-board">
      {errorMessage && (
        <div className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((piece, colIndex) => {
            const isWinningPosition = winningPositions.some(
              ([r, c]) => r === rowIndex && c === colIndex
            );

            let pieceClass = "empty-piece";
            let borderClass = "";

            if (piece === "X") {
              pieceClass = "yellow-piece";
              borderClass = isWinningPosition ? "blinking-border-yellow" : "";
            } else if (piece === "O") {
              pieceClass = "red-piece";
              borderClass = isWinningPosition ? "blinking-border-red" : "";
            }

            return (
              <div
                key={colIndex}
                onClick={() => onCellClick(colIndex)}
                className={`piece`}
              >

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
