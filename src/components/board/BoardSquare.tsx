import { pieces, type Piece, type PieceColor } from "../../useful/pieces";

type BoardSquareProps = {
  squareColor: PieceColor;
  piece: Piece | null;
};

export const BoardSquare = ({ squareColor, piece }: BoardSquareProps) => {
  const isLight = squareColor === "white";

  return (
    <div
      className={`h-20 w-20 text-7xl flex items-center justify-center drop-shadow-sm
        hover:border-4 hover:border-slate-500 ${
          isLight ? "bg-light-tile" : "bg-dark-tile"
        }`}
    >
      {piece ? pieces[piece.type][piece.color] : null}
    </div>
  );
};
