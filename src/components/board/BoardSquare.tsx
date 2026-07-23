import { pieces, type Piece, type PieceColor } from "../../useful/pieces";

type BoardSquareProps = {
  highlighted?: boolean;
  squareColor: PieceColor;
  piece: Piece | null;
  selected: boolean;
  onClick: () => void;
};

export const BoardSquare = ({
  highlighted,
  squareColor,
  piece,
  selected,
  onClick,
}: BoardSquareProps) => {
  const isLight = squareColor === "white";
  const isClickable = piece !== null || highlighted;
  const background = selected
    ? "bg-amber-300"
    : highlighted
      ? "bg-amber-200"
      : isLight
        ? "bg-light-tile"
        : "bg-dark-tile";
  const hover =
    isClickable && !selected ? "hover:border-4 hover:border-slate-500" : "";
  const pointer = isClickable ? "cursor-pointer" : "cursor-default";

  return (
    <div
      onClick={onClick}
      className={`h-20 w-20 text-7xl flex items-center justify-center drop-shadow-sm select-none ${pointer} ${background} ${hover}`}
    >
      {piece ? pieces[piece.type][piece.color] : null}
    </div>
  );
};
