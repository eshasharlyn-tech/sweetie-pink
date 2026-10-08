import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const rupiah = (n) => "Rp " + n.toLocaleString("id-ID");

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-lg shadow-pink-200/60">
        <p className="text-5xl">🛒</p>
        <p className="mt-3 text-gray-500">Keranjangmu masih kosong.</p>
        <Link to="/" className="mt-4 inline-block rounded-full bg-pink-400 px-6 py-2 text-white">
          Belanja dulu
        </Link>
      </div>
    );
  }

  const totalItem = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalHarga = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <h1 className="mb-4 text-2xl font-extrabold text-gray-700">Keranjang kamu</h1>

        <div className="space-y-3">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow shadow-pink-100"
            >
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-pink-50">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-3xl">{item.emoji}</div>
                )}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-700">{item.name}</p>
                <p className="text-pink-500">{rupiah(item.price)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  className="h-7 w-7 rounded-full bg-pink-100 text-pink-500"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  className="h-7 w-7 rounded-full bg-pink-100 text-pink-500"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-400 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="h-fit rounded-3xl bg-white p-6 shadow-lg shadow-pink-200/60 lg:mt-12">
        <h2 className="text-xl font-bold text-gray-700">Ringkasan</h2>
        <div className="mt-3 flex justify-between text-gray-500">
          <span>Total item</span>
          <span>{totalItem}</span>
        </div>
        <div className="mt-2 flex justify-between text-lg font-bold text-pink-500">
          <span>Total</span>
          <span>{rupiah(totalHarga)}</span>
        </div>

        <Link
          to="/checkout"
          className="mt-4 block rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 py-2 text-center font-medium text-white shadow hover:opacity-90"
        >
          Lanjut ke checkout
        </Link>
        <Link to="/" className="mt-2 block text-center text-sm text-pink-500 hover:underline">
          ← Lanjut belanja
        </Link>
      </div>
    </div>
  );
}