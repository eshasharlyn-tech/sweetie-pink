import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalQty } = useCart();

  const link = ({ isActive }) =>
    `rounded-full px-4 py-1.5 text-sm font-medium ${
      isActive ? "bg-white text-pink-500 shadow" : "text-white hover:bg-white/25"
    }`;

  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-pink-300 via-pink-400 to-fuchsia-300 shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <NavLink to="/" className="text-2xl font-extrabold text-white">Sweetie Pink 🎀</NavLink>
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={link}>Home</NavLink>
          <NavLink to="/cart" className={link}>
            Keranjang
            {totalQty > 0 && (
              <span className="ml-2 rounded-full bg-pink-600 px-2 py-0.5 text-xs text-white">{totalQty}</span>
            )}
          </NavLink>
          <NavLink to="/checkout" className={link}>Checkout</NavLink>
        </nav>
      </div>
    </header>
  );
}