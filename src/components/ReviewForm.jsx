import { useState } from "react";
import StarRating from "./StarRating";

export default function ReviewForm({ onSubmit }) {
  const [nama, setNama] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!nama.trim() || rating === 0 || !text.trim()) {
      return setError("Nama, bintang, dan ulasan wajib diisi.");
    }
    onSubmit({ nama: nama.trim(), rating, text: text.trim() });
    setNama("");
    setRating(0);
    setText("");
    setError("");
  };

  const input = "mt-1 w-full rounded-2xl border border-pink-200 p-3 outline-none focus:ring-2 focus:ring-pink-300";

  return (
    <div className="h-fit rounded-3xl bg-white p-6 shadow-lg shadow-pink-200/60">
      <h2 className="text-xl font-bold text-gray-700">Tulis ulasanmu</h2>

      <p className="mt-4 font-semibold text-gray-600">Nama</p>
      <input value={nama} onChange={(e) => setNama(e.target.value)} className={input} />

      <p className="mt-4 font-semibold text-gray-600">Rating</p>
      <StarRating value={rating} onChange={setRating} />

      <p className="mt-4 font-semibold text-gray-600">Ulasan</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} className={input} />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      <button
        onClick={handleSubmit}
        className="mt-3 rounded-full bg-gradient-to-r from-pink-400 to-fuchsia-400 px-6 py-2 font-medium text-white"
      >
        Kirim ulasan
      </button>
    </div>
  );
}