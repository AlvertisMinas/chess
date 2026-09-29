import { Route, Routes } from "react-router";
import { AdminApp } from "./components/AdminApp";
import { GuestRoom } from "./components/GuestRoom";
import { Home } from "./components/Home";

const App = () => (
  <Routes>
    <Route path="/admin" element={<AdminApp />} />
    <Route path="/room/:roomId" element={<GuestRoom />} />
    <Route path="*" element={<Home />} />
  </Routes>
);

export default App;
