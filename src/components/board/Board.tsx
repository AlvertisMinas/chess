import type { BoardState, Coord } from "../../useful/boardState";
import { BoardNumbers } from "./BoardNumbers";
import { BoardSquare } from "./BoardSquare";

type BoardProps = {
  boardState: BoardState;
  selected: Coord | null;
  onSquareClick: (row: number, col: number) => void;
  possibleMoves: Coord[] | null;
};

const BoardRank = ({ rowIndex }: { rowIndex: number }) => (
  <div className="w-8 text-slate-400 text-lg">
    {String.fromCharCode(72 - rowIndex)}
  </div>
);

export const Board = ({
  boardState,
  selected,
  onSquareClick,
  possibleMoves,
}: BoardProps) => {
  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 text-center">
      <BoardNumbers />
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center">
          <BoardRank rowIndex={rowIndex} />
          {row.map((piece, columnIndex) => (
            <BoardSquare
              key={columnIndex}
              highlighted={possibleMoves?.some(
                (coord) => coord.row === rowIndex && coord.col === columnIndex,
              )}
              squareColor={
                ((rowIndex % 2) + columnIndex) % 2 === 0 ? "white" : "black"
              }
              piece={piece}
              selected={
                selected?.row === rowIndex && selected?.col === columnIndex
              }
              onClick={() => onSquareClick(rowIndex, columnIndex)}
            />
          ))}
          <BoardRank rowIndex={rowIndex} />
        </div>
      ))}
      <BoardNumbers />
    </div>
  );
};
