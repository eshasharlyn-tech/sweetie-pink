import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const link = ({ isActive }) =>
    `block rounded-2xl px-5 py-3 font-medium transition ${
      isActive ? "bg-white text-pink-500 shadow" : "text-white hover:bg-white/25"
    }`;

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-gradient-to-b from-pink-300 via-pink-400 to-fuchsia-300 p-6">
      <h2 className="mb-8 text-2xl font-extrabold text-white">My Admin 🎀</h2>

      <nav className="flex flex-1 flex-col gap-2">
        <NavLink to="/admin" end className={link}>Dashboard</NavLink>
        <NavLink to="/admin/about" className={link}>About</NavLink>
      </nav>

      <NavLink to="/" className="block rounded-2xl bg-white/25 px-5 py-3 text-center font-medium text-white hover:bg-white/40">
        ← Lihat Toko
      </NavLink>
    </aside>
  );
}