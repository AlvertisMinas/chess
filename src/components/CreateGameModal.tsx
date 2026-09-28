import { useState } from "react";
import type { PieceColor } from "../useful/pieces";

type CreateGameModalProps = {
  onCreate: (
    roomName: string,
    pin: string,
    hostColor: PieceColor,
  ) => Promise<void>;
  onCancel: () => void;
};

export const CreateGameModal = ({
  onCreate,
  onCancel,
}: CreateGameModalProps) => {
  const [roomName, setRoomName] = useState("");
  const [createPin, setCreatePin] = useState("");
  const [hostColor, setHostColor] = useState<PieceColor>("white");
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const handleCreate = async () => {
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
      await onCreate(roomName.trim(), createPin.trim(), hostColor);
    } catch {
      setCreateError("Could not create room");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6">
      <div className="flex flex-col gap-3 bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-slate-100 text-lg font-semibold">Create Game</h2>

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
            onClick={onCancel}
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
  );
};
