function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900 rounded-2xl shadow-lg border border-slate-800 p-8 text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Tailwind is working</h1>
        <p className="text-slate-400">
          If this card is centered with rounded corners and a shadow, CSS is set up
          correctly.
        </p>
        <button
          type="button"
          className="rounded-lg bg-sky-600 px-4 py-2 text-white font-medium hover:bg-sky-500"
        >
          Looks good
        </button>
      </div>
    </div>
  )
}

export default App
