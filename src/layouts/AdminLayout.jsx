import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const link = ({ isActive }) =>
    `block rounded-2xl px-4 py-2 font-medium transition md:px-6 md:py-3 ${
      isActive ? "bg-white text-pink-500 shadow" : "text-white hover:bg-white/25"
    }`;

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex w-full shrink-0 flex-col bg-gradient-to-b from-pink-300 via-pink-400 to-fuchsia-300 p-4 md:w-72 md:p-6">
        <h2 className="mb-4 text-2xl font-extrabold text-white md:mb-8 md:text-3xl">My Admin 🎀</h2>

        <nav className="mb-3 flex flex-row flex-wrap gap-2 md:mb-0 md:flex-1 md:flex-col">
          <NavLink to="/admin" end className={link}>Dashboard</NavLink>
          <NavLink to="/admin/about" className={link}>About</NavLink>
        </nav>

        <NavLink
          to="/"
          className="block rounded-2xl bg-white/25 px-4 py-2 text-center font-medium text-white hover:bg-white/40 md:px-6 md:py-3"
        >
          ← Lihat Toko
        </NavLink>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
        <header className="flex items-center justify-between border-b-4 border-pink-300 bg-white px-4 py-4 md:px-8">
          <div>
            <h1 className="bg-gradient-to-r from-pink-500 to-fuchsia-500 bg-clip-text text-2xl font-extrabold text-transparent">
              My Admin
            </h1>
            <p className="text-sm text-gray-400">Kelola data aplikasi kamu</p>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="hidden sm:inline">Halo, Esha 👋</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-pink-500 font-bold text-white">
              E
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-pink-100 bg-white py-4 text-center text-sm text-pink-400">
          © 2026 My Admin App — v1.0.0 💗
        </footer>
      </div>
    </div>
  );
}