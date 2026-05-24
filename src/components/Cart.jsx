import React, { useContext } from "react";
import { CartContext } from "../CartContext";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <main>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No products added yet.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          <button onClick={clearCart}>Clear Cart</button>
        </div>
      )}
    </main>
  );
}

export default Cart;
