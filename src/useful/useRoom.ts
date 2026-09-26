import { useEffect, useState } from "react";
import { subscribeToRoom, type RoomData } from "./rooms";

export const useRoom = (roomId: string | null) => {
  const [room, setRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    if (!roomId) {
      setRoom(null);
      return;
    }

    const unsubscribe = subscribeToRoom(roomId, setRoom);
    return unsubscribe;
  }, [roomId]);

  return room;
};
