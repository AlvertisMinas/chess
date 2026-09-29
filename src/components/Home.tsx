import { Link } from "react-router";

export const Home = () => (
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
);
