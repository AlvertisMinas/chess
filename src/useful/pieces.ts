export const pieces = {
  king: { white: "♔", black: "♚" },
  queen: { white: "♕", black: "♛" },
  rook: { white: "♖", black: "♜" },
  bishop: { white: "♗", black: "♝" },
  knight: { white: "♘", black: "♞" },
  pawn: { white: "♙︎", black: "♟︎" },
} as const;

export type PieceType = keyof typeof pieces;
export type PieceColor = "white" | "black";

export type Piece = {
  color: PieceColor;
  type: PieceType;
};
