import { useState } from "react";
import type { AdminRoom } from "../useful/rooms";

type DashboardProps = {
  rooms: AdminRoom[];
  onCreateClick: (hostName: string) => void;
  onSelectRoom: (roomId: string) => void;
  onLogout: () => void;
};

export const Dashboard = ({
  rooms,
  onCreateClick,
  onSelectRoom,
  onLogout,
}: DashboardProps) => {
  const [hostName, setHostName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateClick = () => {
    if (!hostName.trim()) {
      setError("Enter your display name");
      return;
    }
    setError(null);
    onCreateClick(hostName.trim());
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h1 className="text-slate-100 text-2xl font-semibold">Dashboard</h1>
          <button
            className="text-slate-400 hover:text-slate-200 text-sm underline"
            onClick={onLogout}
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

        {error && (
          <div className="text-red-400 text-sm text-center">{error}</div>
        )}

        <button
          className="bg-emerald-600 hover:bg-emerald-500 text-white rounded px-3 py-2"
          onClick={handleCreateClick}
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
              onClick={() => onSelectRoom(room.id)}
            >
              <span className="text-slate-100 truncate">{room.name}</span>
              <span className="text-slate-500 text-sm shrink-0">
                PIN: {room.pin} · {room.playerCount}/2
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
