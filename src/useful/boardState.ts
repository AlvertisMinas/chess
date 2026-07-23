import type { Piece } from "./pieces";

export type Coord = {
  row: number;
  col: number;
};

export type BoardState = (Piece | null)[][];

export const initialBoardState: BoardState = [
  [
    { color: "black", type: "rook" },
    { color: "black", type: "knight" },
    { color: "black", type: "bishop" },
    { color: "black", type: "queen" },
    { color: "black", type: "king" },
    { color: "black", type: "bishop" },
    { color: "black", type: "knight" },
    { color: "black", type: "rook" },
  ],
  [
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
    { color: "black", type: "pawn" },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, { color: "black", type: "rook" }, null, null, null, null],
  [
    null,
    null,
    { color: "black", type: "bishop" },
    null,
    null,
    null,
    { color: "white", type: "rook" },
    null,
  ],
  [
    { color: "black", type: "pawn" },
    null,
    null,
    { color: "white", type: "king" },
    { color: "white", type: "queen" },
    null,
    null,
    null,
  ],
  [
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
    { color: "white", type: "pawn" },
  ],
  [
    { color: "white", type: "rook" },
    { color: "white", type: "knight" },
    { color: "white", type: "bishop" },
    { color: "white", type: "queen" },
    { color: "white", type: "king" },
    { color: "white", type: "bishop" },
    { color: "white", type: "knight" },
    { color: "white", type: "rook" },
  ],
];
