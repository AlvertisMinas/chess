import { pieces } from "../data/pieces";

export const ChessPieces = () => {
  return (
    <>
      <h1 className="text-slate-100 text-xl font-semibold tracking-wide">
        Chess Pieces
      </h1>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(pieces).map(([name, { white, black }]) => (
          <div key={name} className="space-y-2">
            <p className="text-slate-400 text-xs uppercase tracking-wider">
              {name}
            </p>
            <div className="flex overflow-hidden rounded-lg border border-slate-700">
              <div className="flex-1 h-14 bg-[#f0d9b5] text-4xl flex items-center justify-center text-slate-900 drop-shadow-sm">
                {white}
              </div>
              <div className="flex-1 h-14 bg-[#b58863] text-4xl flex items-center justify-center text-slate-950 drop-shadow-sm">
                {black}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
