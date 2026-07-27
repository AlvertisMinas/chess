import { useState } from "react";
import { Board } from "./components/board/Board";
import {
  initialBoardState,
  type BoardState,
  type Coord,
} from "./useful/boardState";
import { moves } from "./useful/moves";

const App = () => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [selected, setSelected] = useState<Coord | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Coord[] | null>([]);

  const handleSquareClick = (row: number, col: number) => {
    // If the square is the already selected piece, deselect it
    if (selected?.row === row && selected?.col === col) {
      setSelected(null);
      setPossibleMoves(null);
      return;
    }

    // If the square is a possible move, move the selected piece and deselect it
    if (
      selected &&
      possibleMoves &&
      possibleMoves.some((move) => move.row === row && move.col === col)
    ) {
      handleMove({ row, col });
      return;
    }

    // if there is no selected piece, select the piece and show possible moves
    const piece = boardState[row][col];

    if (piece) {
      setSelected({ row, col });
      setPossibleMoves(moves[piece.type](row, col, boardState));
      return;
    }

    // if the square is empty, deselect the piece
    setSelected(null);
    setPossibleMoves(null);
  };

  const handleMove = (destination: Coord) => {
    if (selected && possibleMoves && destination) {
      setBoardState(movePiece(boardState, selected, destination));
      setSelected(null);
      setPossibleMoves(null);
    }
  };

  const movePiece = (
    boardState: BoardState,
    selected: Coord,
    destination: Coord,
  ) => {
    const newBoardState = [...boardState];
    newBoardState[destination.row][destination.col] =
      boardState[selected.row][selected.col];
    newBoardState[selected.row][selected.col] = null;
    return newBoardState;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <Board
        boardState={boardState}
        selected={selected}
        onSquareClick={handleSquareClick}
        possibleMoves={possibleMoves}
      />
    </div>
  );
};

export default App;
