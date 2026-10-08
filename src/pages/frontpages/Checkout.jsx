import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nama: "", alamat: "", metode: "Transfer" });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.nama.trim() || !form.alamat.trim()) {
      return setError("Nama dan alamat wajib diisi.");
    }
    setDone(true);
    clearCart();
  };

  if (done) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg shadow-pink-200/60">
        <p className="text-5xl">🎉</p>
        <h2 className="mt-3 text-2xl font-bold text-gray-700">Pesanan berhasil!</h2>
        <p className="text-gray-500">Terima kasih, {form.nama}. Pesananmu sedang diproses.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 inline-block rounded-full bg-pink-400 px-6 py-2 text-white"
        >
          Kembali belanja
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <p className="text-center text-pink-400">
        Keranjang kosong. <Link to="/" className="underline">Pilih dessert dulu</Link>
      </p>
    );
  }

  const input =
    "mt-1 w-full rounded-2xl border border-pink-200 p-3 outline-none focus:ring-2 focus:ring-pink-300";

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl bg-white p-6 shadow-lg shadow-pink-200/60 lg:col-span-2">
        <h2 className="text-xl font-bold text-gray-700">Data pengiriman</h2>

        <p className="mt-4 font-semibold text-gray-600">Nama</p>
        <input name="nama" value={form.nama} onChange={handleChange} className={input} />

        <p className="mt-4 font-semibold text-gray-600">Alamat</p>
        <textarea name="alamat" value={form.alamat} onChange={handleChange} rows={3} className={input} />

        <p className="mt-4 font-semibold text-gray-600">Metode pembayaran</p>
        <select name="metode" value={form.metode} onChange={handleChange} className={input}>
          <option>Transfer</option>
          <option>COD</option>
          <option>E-Wallet</option>
        </select>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <button
          onClick={handleSubmit}
          className="mt-4 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-8 py-2 font-medium text-white shadow hover:opacity-90"
        >
          Buat pesanan
        </button>
      </div>

      <div className="h-fit rounded-3xl bg-white p-6 shadow-lg shadow-pink-200/60">
        <h2 className="text-xl font-bold text-gray-700">Pesananmu</h2>
        {cart.map((item) => (
          <div key={item.id} className="mt-2 flex justify-between text-sm text-gray-500">
            <span>{item.name} × {item.qty}</span>
            <span>{rupiah(item.price * item.qty)}</span>
          </div>
        ))}
        <div className="mt-4 flex justify-between border-t border-pink-100 pt-3 text-lg font-bold text-pink-500">
          <span>Total</span>
          <span>{rupiah(total)}</span>
        </div>
      </div>
    </div>
  );
}