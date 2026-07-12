import React, { createContext, useState } from 'react';

export const CartContext = createContext();

const CUPONES_VALIDOS = {
  DESCUENTO10: 0.1,
  BIENVENIDO15: 0.15,
  MATE20: 0.2,
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cupon, setCupon] = useState(null);
  const [cuponError, setCuponError] = useState(null);

  const addToCart = (product, quantity) => {
    const itemInCart = cart.find((item) => item.id === product.id);
    if (itemInCart) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));

  const clearCart = () => {
    setCart([]);
    setCupon(null);
    setCuponError(null);
  };

  const totalQuantity = () => cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = () => cart.reduce((total, item) => total + item.precio * item.quantity, 0);

  const aplicarCupon = (codigo) => {
    const codigoNormalizado = codigo.trim().toUpperCase();
    const descuento = CUPONES_VALIDOS[codigoNormalizado];
    if (descuento) {
      setCupon({ codigo: codigoNormalizado, descuento });
      setCuponError(null);
    } else {
      setCupon(null);
      setCuponError('El cupón ingresado no es válido.');
    }
  };

  const quitarCupon = () => {
    setCupon(null);
    setCuponError(null);
  };

  const totalPrice = () => {
    const base = subtotal();
    if (cupon) return base * (1 - cupon.descuento);
    return base;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeItem,
        clearCart,
        totalQuantity,
        totalPrice,
        subtotal,
        cupon,
        cuponError,
        aplicarCupon,
        quitarCupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
