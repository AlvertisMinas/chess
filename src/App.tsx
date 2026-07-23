import { useState } from "react";
import { Board } from "./components/board/Board";
import {
  initialBoardState,
  type BoardState,
  type Coord,
} from "./useful/boardState";

const App = () => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [selected, setSelected] = useState<Coord | null>(null);

  const handleSquareClick = (row: number, col: number) => {
    if (selected?.row === row && selected?.col === col) {
      setSelected(null);
      return;
    }

    const piece = boardState[row][col];

    if (piece) {
      setSelected({ row, col });
      return;
    }

    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <Board
        boardState={boardState}
        selected={selected}
        onSquareClick={handleSquareClick}
      />
    </div>
  );
};

export default App;
