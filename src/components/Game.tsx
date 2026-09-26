import { useState } from "react";
import { Board } from "./board/Board";
import {
  unflattenBoard,
  type BoardState,
  type Coord,
} from "../useful/boardState";
import { moves } from "../useful/moves";
import { submitMove } from "../useful/rooms";
import { useRoom } from "../useful/useRoom";

type GameProps = {
  uid: string;
  roomId: string;
  onLeave?: () => void;
};

export const Game = ({ uid, roomId, onLeave }: GameProps) => {
  const [selected, setSelected] = useState<Coord | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Coord[] | null>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const room = useRoom(roomId);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/room/${roomId}`,
      );
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail (e.g. no permission) — nothing to recover
      // to here, the link is still visible in the address bar.
    }
  };

  if (!room) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-300 text-lg">Loading room...</div>
      </div>
    );
  }

  const boardState = unflattenBoard(room.board);
  const turn = room.turn;
  const myColor =
    room.players.white?.uid === uid
      ? "white"
      : room.players.black?.uid === uid
        ? "black"
        : null;
  const opponentWaiting = !room.players.white || !room.players.black;

  const handleSquareClick = (row: number, col: number) => {
    // No moves until both players have joined
    if (opponentWaiting) {
      return;
    }

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
    // (only your own pieces, and only on your turn)
    const piece = boardState[row][col];

    if (piece && piece.color === turn && piece.color === myColor) {
      setSelected({ row, col });
      setPossibleMoves(moves[piece.type](row, col, boardState));
      return;
    }

    // if the square is empty, or holds the opponent's piece, deselect
    setSelected(null);
    setPossibleMoves(null);
  };

  const handleMove = (destination: Coord) => {
    if (selected && possibleMoves) {
      const newBoardState = movePiece(boardState, selected, destination);
      const nextTurn = turn === "white" ? "black" : "white";
      setSelected(null);
      setPossibleMoves(null);
      submitMove(roomId, newBoardState, nextTurn);
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

  const currentPlayerName = room.players[turn]?.name;
  const playerCount =
    (room.players.white ? 1 : 0) + (room.players.black ? 1 : 0);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 p-6">
      {onLeave && (
        <button
          className="self-start text-slate-400 hover:text-slate-200 text-sm underline"
          onClick={onLeave}
        >
          ← Back to dashboard
        </button>
      )}
      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <span>
          {room.name} · PIN: {room.pin} · {playerCount}/2
        </span>
        <button
          className="text-slate-400 hover:text-slate-200 underline"
          onClick={copyInviteLink}
        >
          {linkCopied ? "Copied!" : "Copy invite link"}
        </button>
      </div>
      <div className="text-slate-300 text-lg">
        {opponentWaiting
          ? "Waiting for opponent..."
          : `${currentPlayerName} (${turn}) to move`}
      </div>
      <div
        className={
          turn === "black" && myColor === "black"
            ? "text-slate-100 font-medium"
            : "text-slate-500"
        }
      >
        {room.players.black?.name ?? "Waiting for opponent..."}
      </div>
      <Board
        boardState={boardState}
        selected={selected}
        onSquareClick={handleSquareClick}
        possibleMoves={possibleMoves}
      />
      <div
        className={
          turn === "white" && myColor === "white"
            ? "text-slate-100 font-medium"
            : "text-slate-500"
        }
      >
        {room.players.white?.name ?? "Waiting for opponent..."}
      </div>
    </div>
  );
};
