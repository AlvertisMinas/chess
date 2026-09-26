import { Route, Routes } from "react-router";
import { AdminApp } from "./components/AdminApp";
import { GuestRoom } from "./components/GuestRoom";

const App = () => (
  <Routes>
    <Route path="/admin" element={<AdminApp />} />
    <Route path="/room/:roomId" element={<GuestRoom />} />
    <Route
      path="*"
      element={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
          <div className="text-slate-400 text-center">
            Ask your host for an invite link to join a game.
          </div>
        </div>
      }
    />
  </Routes>
);

export default App;
