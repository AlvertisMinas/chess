import type { Piece } from "./pieces";

export type Coord = {
  row: number;
  col: number;
};

export type BoardState = (Piece | null)[][];

export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const flattenBoard = (boardState: BoardState): (Piece | null)[] =>
  boardState.flat();

export const unflattenBoard = (flatBoard: (Piece | null)[]): BoardState => {
  const board: BoardState = [];
  for (let row = 0; row < 8; row++) {
    board.push(flatBoard.slice(row * 8, row * 8 + 8));
  }
  return board;
};

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
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
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
