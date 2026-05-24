 import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const totalQuantity = () => cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = () => cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart, totalQuantity, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};


