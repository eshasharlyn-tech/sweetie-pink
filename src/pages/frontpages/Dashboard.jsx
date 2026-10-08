import { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { products, categories } from "../../utils/data";
import { useCart } from "../../context/CartContext";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const { addToCart } = useCart();

  const filtered = products.filter(
    (p) =>
      (category === "Semua" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300 p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-white">Dessert manis untuk harimu</h1>
        <p className="mt-2 text-white/90">Pilih cake, donat, cookies, atau minuman favoritmu.</p>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari dessert..."
          className="min-w-0 flex-1 rounded-full border border-pink-200 bg-white px-5 py-2 outline-none focus:ring-2 focus:ring-pink-300"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm ${
                category === c ? "bg-pink-400 text-white shadow" : "bg-white text-pink-500 hover:bg-pink-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={addToCart} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-pink-400">Dessert tidak ditemukan. Coba kata kunci lain.</p>
      )}
    </>
  );
}