import { useState } from "react";
import { ChessSquare } from "./Components/ChessSquare";
import { initialBoardState, type BoardState } from "./useful/boardState";

const App = () => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 text-center">
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center">
            {row.map((piece, columnIndex) => (
              <ChessSquare
                key={columnIndex}
                squareColor={
                  ((rowIndex % 2) + columnIndex) % 2 === 0 ? "white" : "black"
                }
                piece={piece}
              />
            ))}
          </div>
        ))}

        {/* <ChessPieces /> */}
      </div>
    </div>
  );
};

export default App;
