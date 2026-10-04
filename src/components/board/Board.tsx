import { FILES, type BoardState, type Coord } from "../../useful/boardState";
import type { PieceColor } from "../../useful/pieces";
import { BoardFiles, BoardRank } from "./BoardLabels";
import { BoardSquare } from "./BoardSquare";

type BoardProps = {
  boardState: BoardState;
  orientation: PieceColor;
  selected: Coord | null;
  onSquareClick: (row: number, col: number) => void;
  possibleMoves: Coord[] | null;
};

const INDICES = [0, 1, 2, 3, 4, 5, 6, 7];

export const Board = ({
  boardState,
  orientation,
  selected,
  onSquareClick,
  possibleMoves,
}: BoardProps) => {
  // A 180° flip reverses both axes, so rows and cols share the same order.
  const order = orientation === "black" ? [...INDICES].reverse() : INDICES;
  const files = order.map((col) => FILES[col]);
  return (
    <div className="bg-slate-900 rounded-2xl shadow-lg border border-slate-800 text-center">
      <BoardFiles files={files} />
      {order.map((row) => (
        <div key={row} className="flex items-center justify-center">
          <BoardRank rowIndex={row} />
          {order.map((col) => {
            const piece = boardState[row][col];
            const isPossibleMove = possibleMoves?.some(
              (coord) => coord.row === row && coord.col === col,
            );
            return (
              <BoardSquare
                key={col}
                highlighted={isPossibleMove}
                capture={Boolean(isPossibleMove && piece)}
                squareColor={((row % 2) + col) % 2 === 0 ? "white" : "black"}
                piece={piece}
                selected={selected?.row === row && selected?.col === col}
                onClick={() => onSquareClick(row, col)}
              />
            );
          })}
          <BoardRank rowIndex={row} />
        </div>
      ))}
      <BoardFiles files={files} />
    </div>
  );
};
