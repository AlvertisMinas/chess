import { RANKS } from "../../useful/boardState";

export const BoardFiles = ({ files }: { files: string[] }) => {
  return (
    <div className="px-8 flex flex-row">
      {files.map((file) => (
        <div
          key={file}
          className="w-20 h-8 text-slate-400 text-xl flex items-center justify-center"
        >
          {file}
        </div>
      ))}
    </div>
  );
};

export const BoardRank = ({ rowIndex }: { rowIndex: number }) => (
  <div className="w-8 text-slate-400 text-lg">{RANKS[rowIndex]}</div>
);
