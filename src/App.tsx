import { Link, Route, Routes } from "react-router";
import { AdminApp } from "./components/AdminApp";
import { GuestRoom } from "./components/GuestRoom";

const App = () => (
  <Routes>
    <Route path="/admin" element={<AdminApp />} />
    <Route path="/room/:roomId" element={<GuestRoom />} />
    <Route
      path="*"
      element={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4 p-6">
          <div className="text-slate-400 text-center">
            Ask your host for an invite link to join a game.
          </div>
          <Link
            to="/admin"
            className="bg-slate-800 hover:bg-slate-700 text-slate-100 rounded px-4 py-2"
          >
            Login
          </Link>
        </div>
      }
    />
  </Routes>
);

export default App;
