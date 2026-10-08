import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const STORAGE_KEY = "sweetie-pink-cart";

// Ambil keranjang tersimpan (kalau ada) saat aplikasi pertama dibuka
const loadCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

//  nama Provider CartProvider (Bebas)
export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  // Simpan keranjang ke localStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  //  Tambah ke cart (jumlah tidak boleh melebihi stok)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, item.stock) }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  //  Update qty (minimal 1, maksimal sesuai stok)
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.min(item.stock, Math.max(1, qty)) }
          : item
      )
    );
  };

  //  Hapus item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //  Kosongkan keranjang (dipanggil setelah checkout berhasil)
  const clearCart = () => setCart([]);

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, clearCart, totalQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);