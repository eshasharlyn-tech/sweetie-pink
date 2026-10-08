import { products } from "../../utils/data";

export default function AdminDashboard() {
  const habis = products.filter((p) => p.stock === 0).length;
  const totalStok = products.reduce((sum, p) => sum + p.stock, 0);
  const rataRating = (
    products.reduce((sum, p) => sum + p.rating, 0) / products.length
  ).toFixed(1);

  const stats = [
    { icon: "🧁", label: "Total produk", value: products.length },
    { icon: "📦", label: "Total stok", value: totalStok },
    { icon: "⚠️", label: "Stok habis", value: habis },
    { icon: "⭐", label: "Rata-rata rating", value: rataRating },
  ];

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300 p-8 shadow-lg">
        <h1 className="text-4xl font-extrabold text-white">Halo, Esha 👋</h1>
        <p className="mt-2 text-white/90">Ringkasan toko dan stok dessert hari ini.</p>
      </section>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-lg shadow-pink-200/60"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100 text-2xl">
              {s.icon}
            </div>
            <div>
              <p className="text-sm text-gray-400">{s.label}</p>
              <p className="text-2xl font-extrabold text-gray-700">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-6 overflow-x-auto rounded-3xl bg-white p-5 shadow-lg shadow-pink-200/60">
        <h2 className="mb-3 text-lg font-bold text-gray-700">Daftar produk</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-pink-100 text-pink-500">
              <th className="py-2">Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Rating</th>
              <th>Stok</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-pink-50">
                <td className="py-2">{p.emoji} {p.name}</td>
                <td>{p.category}</td>
                <td>Rp {p.price.toLocaleString("id-ID")}</td>
                <td>★ {p.rating}</td>
                <td>
                  {p.stock === 0 ? (
                    <span className="rounded-full bg-red-100 px-3 py-0.5 text-xs text-red-500">Habis</span>
                  ) : (
                    <span className="rounded-full bg-pink-100 px-3 py-0.5 text-xs text-pink-500">{p.stock}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}