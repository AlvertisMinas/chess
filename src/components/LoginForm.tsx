import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    setLoginError(null);
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setLoginError("Invalid email or password");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <h1 className="text-slate-100 text-2xl font-semibold text-center">
          Host Login
        </h1>
        <input
          className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
        />
        <input
          className="bg-slate-800 text-slate-100 rounded px-3 py-2 outline-none"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          onKeyDown={(event) => event.key === "Enter" && handleLogin()}
        />
        {loginError && (
          <div className="text-red-400 text-sm text-center">{loginError}</div>
        )}
        <button
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded px-3 py-2"
          onClick={handleLogin}
          disabled={loggingIn}
        >
          Log in
        </button>
      </div>
    </div>
  );
};
