import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "../firebase";
import { isAdminUid } from "../useful/admin";
import { createRoom, listenAdminRooms, type AdminRoom } from "../useful/rooms";
import type { PieceColor } from "../useful/pieces";
import { CreateGameModal } from "./CreateGameModal";
import { Dashboard } from "./Dashboard";
import { Game } from "./Game";
import { LoginForm } from "./LoginForm";

export const AdminApp = () => {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const [rooms, setRooms] = useState<AdminRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [pendingHostName, setPendingHostName] = useState("");

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

  const handleCreateClick = (hostName: string) => {
    setPendingHostName(hostName);
    setShowCreateModal(true);
  };

  const handleCreate = async (
    roomName: string,
    pin: string,
    hostColor: PieceColor,
  ) => {
    if (!user) return;
    const roomId = await createRoom(
      user.uid,
      pendingHostName,
      roomName,
      pin,
      hostColor,
    );
    setShowCreateModal(false);
    setActiveRoomId(roomId);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-300 text-lg">Checking session...</div>
      </div>
    );
  }

  if (!user || !isAdminUid(user.uid)) {
    return <LoginForm />;
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
    <>
      <Dashboard
        rooms={rooms}
        onCreateClick={handleCreateClick}
        onSelectRoom={setActiveRoomId}
        onLogout={() => signOut(auth)}
      />
      {showCreateModal && (
        <CreateGameModal
          onCreate={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      )}
    </>
  );
};
