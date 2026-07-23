import type { BoardState, Coord } from "./boardState";
import type { PieceColor, PieceType } from "./pieces";

const inBounds = (row: number, col: number) =>
  row >= 0 && row < 8 && col >= 0 && col < 8;

const rookDirs = [
  { dr: -1, dc: 0 },
  { dr: 1, dc: 0 },
  { dr: 0, dc: -1 },
  { dr: 0, dc: 1 },
] as const;

const bishopDirs = [
  { dr: -1, dc: -1 },
  { dr: -1, dc: 1 },
  { dr: 1, dc: -1 },
  { dr: 1, dc: 1 },
] as const;

const queenDirs = [...rookDirs, ...bishopDirs];

const slides = (
  row: number,
  col: number,
  board: BoardState,
  color: PieceColor,
  dirs: readonly { dr: number; dc: number }[],
): Coord[] => {
  const moves: Coord[] = [];

  for (const { dr, dc } of dirs) {
    let r = row + dr;
    let c = col + dc;

    while (inBounds(r, c)) {
      const target = board[r][c];

      if (!target) {
        moves.push({ row: r, col: c });
      } else {
        if (target.color !== color) {
          moves.push({ row: r, col: c });
        }
        break;
      }

      r += dr;
      c += dc;
    }
  }

  return moves;
};

type MoveFn = (row: number, col: number, board: BoardState) => Coord[];

export const moves: Record<PieceType, MoveFn> = {
  king: (row, col, board) => {
    const piece = board[row][col];
    if (!piece) return [];

    return [
      { row: row - 1, col },
      { row: row - 1, col: col + 1 },
      { row: row - 1, col: col - 1 },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 },
      { row: row + 1, col: col - 1 },
      { row, col: col + 1 },
      { row, col: col - 1 },
    ].filter(({ row: r, col: c }) => {
      if (!inBounds(r, c)) return false;
      const target = board[r][c];
      return !target || target.color !== piece.color;
    });
  },

  rook: (row, col, board) => {
    const piece = board[row][col];
    if (!piece) return [];
    return slides(row, col, board, piece.color, rookDirs);
  },

  bishop: (row, col, board) => {
    const piece = board[row][col];
    if (!piece) return [];
    return slides(row, col, board, piece.color, bishopDirs);
  },

  queen: (row, col, board) => {
    const piece = board[row][col];
    if (!piece) return [];
    return slides(row, col, board, piece.color, queenDirs);
  },

  pawn: (row, col, board) => {
    const piece = board[row][col];
    if (!piece) return [];

    const dr = piece.color === "white" ? -1 : 1;
    const startRow = piece.color === "white" ? 6 : 1;
    const moves: Coord[] = [];

    if (inBounds(row + dr, col) && !board[row + dr][col]) {
      moves.push({ row: row + dr, col });
      if (row === startRow && !board[row + 2 * dr][col]) {
        moves.push({ row: row + 2 * dr, col });
      }
    }

    for (const dc of [-1, 1]) {
      const r = row + dr;
      const c = col + dc;
      if (!inBounds(r, c)) continue;
      const target = board[r][c];
      if (target && target.color !== piece.color) {
        moves.push({ row: r, col: c });
      }
    }

    return moves;
  },

  knight: (row, col, board) => {
    const piece = board[row][col];
    if (!piece) return [];

    return [
      { row: row - 2, col: col - 1 },
      { row: row - 2, col: col + 1 },
      { row: row - 1, col: col - 2 },
      { row: row - 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col - 1 },
      { row: row + 2, col: col + 1 },
    ].filter(({ row: r, col: c }) => {
      if (!inBounds(r, c)) return false;
      const target = board[r][c];
      return !target || target.color !== piece.color;
    });
  },
};
