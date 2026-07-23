export const BoardNumbers = () => {
  return (
    <div className="px-8 flex flex-row">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-20 h-8 text-slate-400 text-xl flex items-center justify-center"
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};
