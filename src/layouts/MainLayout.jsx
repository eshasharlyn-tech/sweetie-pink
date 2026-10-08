import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-pink-50 via-white to-fuchsia-50">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-pink-100 bg-white py-4 text-center text-sm text-pink-400">
        © 2026 Sweetie Pink 💗
      </footer>
    </div>
  );
}