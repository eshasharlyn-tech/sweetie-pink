import { useState } from "react";
import { useParams } from "react-router-dom";
import StarRating from "../../components/StarRating";
import ReviewForm from "../../components/ReviewForm";
import { products } from "../../utils/data";
import { useCart } from "../../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const [reviews, setReviews] = useState([]);
  const [gagal, setGagal] = useState(false);

  if (!product) return <p className="text-pink-400">Produk tidak ditemukan.</p>;

  const adaFoto = product.image && !gagal;
  const addReview = (data) => setReviews([{ id: Date.now(), ...data }, ...reviews]);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex flex-wrap items-center gap-6 rounded-3xl bg-white p-6 shadow-lg shadow-pink-200/60">
          <div className="h-40 w-40 shrink-0 overflow-hidden rounded-2xl bg-pink-50">
            {adaFoto ? (
              <img
                src={product.image}
                alt={product.name}
                onError={() => setGagal(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl">{product.emoji}</div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-gray-700">{product.name}</h1>
            <p className="text-xl text-pink-500">Rp {product.price.toLocaleString("id-ID")}</p>
            <div className="flex items-center gap-2">
              <StarRating value={product.rating} />
              <span className="text-sm text-gray-400">{product.rating} · {product.sold} terjual</span>
            </div>
            {product.stock === 0 ? (
              <button disabled className="mt-3 rounded-full bg-gray-200 px-6 py-2 text-gray-400">Stok habis</button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="mt-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-6 py-2 text-white"
              >
                Tambah ke keranjang
              </button>
            )}
          </div>
        </div>

        <h2 className="mb-3 mt-8 text-xl font-bold text-gray-700">Ulasan pelanggan</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-400">Belum ada ulasan. Jadilah yang pertama.</p>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r.id} className="rounded-2xl bg-white p-4 shadow shadow-pink-100">
                <p className="font-semibold text-gray-700">{r.nama}</p>
                <StarRating value={r.rating} />
                <p className="mt-1 text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReviewForm onSubmit={addReview} />
    </div>
  );
}