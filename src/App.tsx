import { ChessPieces } from "./Components/ChessPieces";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 text-center space-y-6">
        <ChessPieces />
      </div>
    </div>
  );
};

export default App;
