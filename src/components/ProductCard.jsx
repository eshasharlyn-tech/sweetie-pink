import { useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function ProductCard({ product, onAdd }) {
  const [gagal, setGagal] = useState(false);
  const habis = product.stock === 0;
  const adaFoto = product.image && !gagal;

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-pink-200/60 transition hover:-translate-y-1">
      <div className="h-40 overflow-hidden bg-gradient-to-br from-pink-100 to-fuchsia-100">
        {adaFoto ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setGagal(true)}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl">{product.emoji}</div>
        )}
      </div>

      <div className="p-4">
        <span className="rounded-full bg-pink-100 px-3 py-0.5 text-xs text-pink-500">{product.category}</span>
        <h3 className="mt-2 font-bold text-gray-700">{product.name}</h3>
        <p className="font-semibold text-pink-500">Rp {product.price.toLocaleString("id-ID")}</p>

        <div className="flex items-center gap-1">
          <StarRating value={product.rating} />
          <span className="text-xs text-gray-400">{product.rating} · {product.sold} terjual</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Link to={`/product/${product.id}`} className="text-sm text-pink-500 hover:underline">Lihat detail</Link>
          {habis ? (
            <button disabled className="rounded-full bg-gray-200 px-4 py-1.5 text-sm text-gray-400">Habis</button>
          ) : (
            <button
              onClick={() => onAdd(product)}
              className="rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-4 py-1.5 text-sm font-medium text-white"
            >
              Tambah
            </button>
          )}
        </div>
      </div>
    </div>
  );
}