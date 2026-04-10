import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists)
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  
  const generateTrxId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({ length: 3 }, () =>
      letters[Math.floor(Math.random() * letters.length)]
    ).join('');
    const randomNumbers = Math.floor(100 + Math.random() * 900);
    return randomLetters + randomNumbers;
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const newTrx = {
      id: generateTrxId(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      date: new Date().toLocaleString('id-ID'),
    };
    setHistory((prev) => [newTrx, ...prev]);
    setCart([]);
  };

  
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const moveWishlistToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const isWishlisted = (id) => wishlist.some((p) => p.id === id);

  return (
    <AppContext.Provider
      value={{
        cart, cartCount, wishlist, history, isDarkMode, setIsDarkMode,
        addToCart, updateQty, checkout,
        addToWishlist, removeFromWishlist, moveWishlistToCart, isWishlisted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};