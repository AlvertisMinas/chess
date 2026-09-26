import { useCallback, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../useful/useAuth";
import { Game } from "./Game";
import { JoinRoom } from "./JoinRoom";

export const GuestRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { uid } = useAuth();
  const [joined, setJoined] = useState(false);
  const handleJoined = useCallback(() => setJoined(true), []);

  if (!roomId) {
    return null;
  }

  if (!uid) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-300 text-lg">Connecting...</div>
      </div>
    );
  }

  if (joined) {
    return <Game uid={uid} roomId={roomId} />;
  }

  return <JoinRoom uid={uid} roomId={roomId} onJoined={handleJoined} />;
};
