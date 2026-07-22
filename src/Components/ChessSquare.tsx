import { pieces, type Piece, type PieceColor } from "../useful/pieces";

type ChessSquareProps = {
  squareColor: PieceColor;
  piece: Piece | null;
};

export const ChessSquare = ({ squareColor, piece }: ChessSquareProps) => {
  const isLight = squareColor === "white";

  return (
    <div
      className={`h-12 w-12 text-4xl flex items-center justify-center drop-shadow-sm ${
        isLight ? "bg-light-tile text-slate-900" : "bg-dark-tile text-slate-950"
      }`}
    >
      {piece ? pieces[piece.type][piece.color] : null}
    </div>
  );
};
