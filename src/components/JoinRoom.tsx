import { useEffect, useState } from "react";
import { getRoomSummary, joinRoom, type RoomSummary } from "../useful/rooms";

type JoinRoomProps = {
  uid: string;
  roomId: string;
  onJoined: (roomId: string) => void;
};

export const JoinRoom = ({ uid, roomId, onJoined }: JoinRoomProps) => {
  const [summary, setSummary] = useState<RoomSummary | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getRoomSummary(roomId, uid).then((result) => {
      if (cancelled) return;
      if (!result) {
        setNotFound(true);
      } else if (result.isMember) {
        // Already seated here (e.g. a page refresh) — skip the form.
        onJoined(roomId);
      } else {
        setSummary(result);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [roomId, uid, onJoined]);

  const handleJoin = async () => {
    if (!name.trim() || !pin.trim()) {
      setError("Enter your name and the PIN");
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await joinRoom(roomId, uid, name.trim(), pin.trim());
      onJoined(roomId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join room");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-slate-100 text-2xl font-semibold text-center">
          Chess
        </h1>

        {notFound && (
          <div className="text-red-400 text-sm text-center">
            This invite link is no longer valid.
          </div>
        )}

        {summary?.isFull && (
          <div className="text-red-400 text-sm text-center">
            This room is already full.
          </div>
        )}

        {summary && !summary.isFull && (
          <>
            <div className="text-slate-300 text-center">
              Join "{summary.name}"
            </div>

            <input
              className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
              placeholder="Your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={20}
            />

            <input
              className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
              placeholder="PIN"
              value={pin}
              onChange={(event) =>
                setPin(event.target.value.replace(/\D/g, ""))
              }
              maxLength={6}
              inputMode="numeric"
            />

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded px-3 py-2"
              onClick={handleJoin}
              disabled={busy}
            >
              Join
            </button>
          </>
        )}
      </div>
    </div>
  );
};
