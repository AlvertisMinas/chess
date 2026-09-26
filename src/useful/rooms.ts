import {
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  flattenBoard,
  initialBoardState,
  type BoardState,
} from "./boardState";
import type { Piece, PieceColor } from "./pieces";

export type PlayerInfo = {
  uid: string;
  name: string;
};

export type RoomData = {
  name: string;
  pin: string;
  board: (Piece | null)[];
  turn: PieceColor;
  players: {
    white: PlayerInfo | null;
    black: PlayerInfo | null;
  };
};

// A room as shown in the admin dashboard — includes the actual PIN, since
// the admin is the one who needs to hand it out.
export type AdminRoom = {
  id: string;
  name: string;
  pin: string;
  playerCount: number;
};

// Just enough info for a guest arriving via an invite link to know what to
// show them, without exposing anything beyond what they need.
export type RoomSummary = {
  id: string;
  name: string;
  isFull: boolean;
  isMember: boolean;
};

export const createRoom = async (
  uid: string,
  playerName: string,
  roomName: string,
  pin: string,
  hostColor: PieceColor,
) => {
  const roomRef = doc(collection(db, "rooms"));
  const host = { uid, name: playerName };

  await setDoc(roomRef, {
    name: roomName,
    pin,
    board: flattenBoard(initialBoardState),
    turn: "white",
    players: {
      white: hostColor === "white" ? host : null,
      black: hostColor === "black" ? host : null,
    },
    createdAt: serverTimestamp(),
  });

  return roomRef.id;
};

export const joinRoom = async (
  roomId: string,
  uid: string,
  name: string,
  enteredPin: string,
) => {
  const roomRef = doc(db, "rooms", roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error("Room not found");
  }

  const room = snapshot.data() as RoomData;

  // Already in this room (e.g. a page refresh) — nothing to do.
  if (room.players.white?.uid === uid || room.players.black?.uid === uid) {
    return;
  }

  if (room.pin !== enteredPin) {
    throw new Error("Incorrect PIN");
  }

  if (!room.players.white) {
    await updateDoc(roomRef, { "players.white": { uid, name } });
  } else if (!room.players.black) {
    await updateDoc(roomRef, { "players.black": { uid, name } });
  } else {
    throw new Error("Room is full");
  }
};

export const getRoomSummary = async (
  roomId: string,
  uid: string,
): Promise<RoomSummary | null> => {
  const snapshot = await getDoc(doc(db, "rooms", roomId));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() as RoomData;
  return {
    id: snapshot.id,
    name: data.name,
    isFull: Boolean(data.players.white && data.players.black),
    isMember: data.players.white?.uid === uid || data.players.black?.uid === uid,
  };
};

export const subscribeToRoom = (
  roomId: string,
  callback: (room: RoomData | null) => void,
) =>
  onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
    callback(snapshot.exists() ? (snapshot.data() as RoomData) : null);
  });

// Lists every room, newest first, for the admin dashboard. Sorting happens
// on the client to avoid needing a Firestore composite index.
export const listenAdminRooms = (callback: (rooms: AdminRoom[]) => void) => {
  const roomsQuery = query(collection(db, "rooms"), limit(50));

  return onSnapshot(roomsQuery, (snapshot) => {
    const rooms = snapshot.docs
      .map((docSnapshot) => {
        const data = docSnapshot.data() as RoomData & {
          createdAt?: { toMillis: () => number } | null;
        };
        const playerCount =
          (data.players.white ? 1 : 0) + (data.players.black ? 1 : 0);
        return {
          id: docSnapshot.id,
          name: data.name,
          pin: data.pin,
          playerCount,
          createdAtMillis: data.createdAt?.toMillis() ?? 0,
        };
      })
      .sort((a, b) => b.createdAtMillis - a.createdAtMillis)
      .map(({ id, name, pin, playerCount }) => ({ id, name, pin, playerCount }));

    callback(rooms);
  });
};

export const submitMove = (
  roomId: string,
  boardState: BoardState,
  turn: PieceColor,
) =>
  updateDoc(doc(db, "rooms", roomId), {
    board: flattenBoard(boardState),
    turn,
  });
