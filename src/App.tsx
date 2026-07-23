import { useState } from "react";
import { Board } from "./components/board/Board";
import { initialBoardState, type BoardState } from "./useful/boardState";

const App = () => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <Board boardState={boardState} />
    </div>
  );
};

export default App;
