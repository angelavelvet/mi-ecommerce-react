import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { CartProvider, CartContext } from './CartContext';
import Layout from './components/Layout';
import productosData from './productos.json'; // Importación directa del catálogo desde src

// 1. Vista de Inicio (Home)
const Inicio = () => (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    <h2>¡Bienvenidos a nuestra Tienda! 🇦🇷</h2>
    <p>Explorá nuestro catálogo con los mejores productos locales.</p>
  </div>
);

// 2. Vista de Catálogo (Muestra las tarjetas de los productos)
const Productos = () => {
  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
        {productosData.map((prod) => (
          <div key={prod.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '220px', background: '#fff' }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{prod.nombre}</h3>
            <p style={{ fontWeight: 'bold', color: '#28a745', fontSize: '16px' }}>${prod.precio.toLocaleString('es-AR')} ARS</p>
            <Link to={`/producto/${prod.id}`} style={{ display: 'inline-block', marginTop: '10px', background: '#007bff', color: '#fff', padding: '8px 12px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. Vista de Detalle de Producto (/producto/:id)
const ProductoDetalle = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);

  const producto = productosData.find((item) => item.id === parseInt(id));

  if (!producto) return <p>Buscando producto...</p>;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', maxWidth: '500px', margin: '20px auto', background: '#f9f9f9' }}>
      <h2>{producto.nombre}</h2>
      <p style={{ margin: '15px 0', color: '#555' }}>{producto.descripcion}</p>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>${producto.precio.toLocaleString('es-AR')} ARS</p>
      
      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={() => cantidad > 1 && setCantidad(cantidad - 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cantidad}</span>
        <button onClick={() => setCantidad(cantidad + 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
      </div>
      
      <button onClick={() => addToCart(producto, cantidad)} style={{ background: '#28a745', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
        Agregar al Carrito ({cantidad})
      </button>
    </div>
  );
};

// 4. Vista del Carrito (/carrito)
const CarritoView = () => {
  const { cart, removeItem, clearCart, totalPrice } = useContext(CartContext);

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? <p>El carrito está vacío.</p> : (
        <div>
          <button onClick={clearCart} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '5px', marginBottom: '15px', cursor: 'pointer' }}>Vaciar Carrito</button>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <div><h4>{item.nombre} (x{item.quantity})</h4></div>
              <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontWeight: 'bold' }}>Quitar</button>
            </div>
          ))}
          <h3>Total a pagar: ${totalPrice().toLocaleString('es-AR')} ARS</h3>
        </div>
      )}
    </div>
  );
};

// Componente principal de la App
function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="producto/:id" element={<ProductoDetalle />} />
          <Route path="carrito" element={<CarritoView />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;

