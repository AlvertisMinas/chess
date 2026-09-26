import { useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../firebase";
import { isAdminUid } from "../useful/admin";
import { createRoom, listenAdminRooms, type AdminRoom } from "../useful/rooms";
import type { PieceColor } from "../useful/pieces";
import { Game } from "./Game";

export const AdminApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [hostName, setHostName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [createPin, setCreatePin] = useState("");
  const [hostColor, setHostColor] = useState<PieceColor>("white");
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthChecked(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || !isAdminUid(user.uid)) return;
    return listenAdminRooms(setRooms);
  }, [user]);

  const handleLogin = async () => {
    setLoginError(null);
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setLoginError("Invalid email or password");
    } finally {
      setLoggingIn(false);
    }
  };

  const openCreateModal = () => {
    setRoomName("");
    setCreatePin("");
    setHostColor("white");
    setCreateError(null);
    setShowCreateModal(true);
  };

  const handleCreate = async () => {
    if (!user) return;
    if (!hostName.trim()) {
      setCreateError("Enter your display name");
      return;
    }
    if (!roomName.trim()) {
      setCreateError("Enter a room name");
      return;
    }
    if (!createPin.trim()) {
      setCreateError("Enter a PIN");
      return;
    }
    setCreateError(null);
    setCreating(true);
    try {
      const roomId = await createRoom(
        user.uid,
        hostName.trim(),
        roomName.trim(),
        createPin.trim(),
        hostColor,
      );
      setShowCreateModal(false);
      setActiveRoomId(roomId);
    } catch {
      setCreateError("Could not create room");
    } finally {
      setCreating(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-300 text-lg">Checking session...</div>
      </div>
    );
  }

  if (!user || !isAdminUid(user.uid)) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <h1 className="text-slate-100 text-2xl font-semibold text-center">
            Host Login
          </h1>
          <input
            className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
          />
          <input
            className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            onKeyDown={(event) => event.key === "Enter" && handleLogin()}
          />
          {loginError && (
            <div className="text-red-400 text-sm text-center">
              {loginError}
            </div>
          )}
          <button
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded px-3 py-2"
            onClick={handleLogin}
            disabled={loggingIn}
          >
            Log in
          </button>
        </div>
      </div>
    );
  }

  if (activeRoomId) {
    return (
      <Game
        uid={user.uid}
        roomId={activeRoomId}
        onLeave={() => setActiveRoomId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-100 text-2xl font-semibold">Dashboard</h1>
          <button
            className="text-slate-400 hover:text-slate-200 text-sm underline"
            onClick={() => signOut(auth)}
          >
            Log out
          </button>
        </div>

        <input
          className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
          placeholder="Your display name (used when you create games)"
          value={hostName}
          onChange={(event) => setHostName(event.target.value)}
          maxLength={20}
        />

        <button
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded px-3 py-2"
          onClick={openCreateModal}
        >
          Create Game
        </button>

        <div className="flex flex-col gap-2">
          {rooms.length === 0 && (
            <div className="text-slate-600 text-sm text-center">
              No rooms yet
            </div>
          )}
          {rooms.map((room) => (
            <button
              key={room.id}
              className="bg-slate-800 hover:bg-slate-700 text-left rounded px-3 py-2 flex items-center justify-between gap-2"
              onClick={() => setActiveRoomId(room.id)}
            >
              <span className="text-slate-100 truncate">{room.name}</span>
              <span className="text-slate-500 text-sm shrink-0">
                PIN: {room.pin} · {room.playerCount}/2
              </span>
            </button>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
          <div className="flex flex-col gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">
            <h2 className="text-slate-100 text-lg font-semibold">
              Create Game
            </h2>

            <input
              className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
              placeholder="Room name"
              value={roomName}
              onChange={(event) => setRoomName(event.target.value)}
              maxLength={30}
              autoFocus
            />

            <input
              className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
              placeholder="PIN"
              value={createPin}
              onChange={(event) =>
                setCreatePin(event.target.value.replace(/\D/g, ""))
              }
              maxLength={6}
              inputMode="numeric"
            />

            <div className="flex gap-2">
              <button
                className={`flex-1 rounded px-3 py-2 ${
                  hostColor === "white"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
                onClick={() => setHostColor("white")}
              >
                Play White
              </button>
              <button
                className={`flex-1 rounded px-3 py-2 ${
                  hostColor === "black"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-300"
                }`}
                onClick={() => setHostColor("black")}
              >
                Play Black
              </button>
            </div>

            {createError && (
              <div className="text-red-400 text-sm text-center">
                {createError}
              </div>
            )}

            <div className="flex gap-2 justify-end mt-1">
              <button
                className="bg-slate-700 hover:bg-slate-600 text-white rounded px-3 py-2"
                onClick={() => setShowCreateModal(false)}
                disabled={creating}
              >
                Cancel
              </button>
              <button
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded px-3 py-2"
                onClick={handleCreate}
                disabled={creating}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
