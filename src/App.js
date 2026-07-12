import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { CartProvider, CartContext } from './CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider, useProducts } from './context/ProductContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Spinner from './components/Spinner';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import './App.css';

const Inicio = () => (
  <div className="hero">
    <div className="hero-icon">🧉</div>
    <h2>Bienvenidos a Bazar Nacional</h2>
    <p>Mates, termos y bombillas de fabricación argentina, elegidos con onda para acompañarte todos los días.</p>
    <Link to="/productos" className="hero-cta">Ver catálogo</Link>
  </div>
);

const Productos = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <Spinner mensaje="Cargando catálogo..." />;
  if (error) return <p className="auth-error">{error}</p>;

  return (
    <div>
      {products.length === 0 ? (
        <p>Todavía no hay productos cargados en el catálogo.</p>
      ) : (
        <div className="product-grid">
          {products.map((prod) => (
            <div key={prod.id} className="product-card">
              <h3>{prod.nombre}</h3>
              <p className="product-price">${Number(prod.precio).toLocaleString('es-AR')} ARS</p>
              <Link to={`/producto/${prod.id}`} className="product-detail-btn">
                Ver Detalle
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ProductoDetalle = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products, loading } = useProducts();
  const [cantidad, setCantidad] = useState(1);

  if (loading) return <Spinner mensaje="Cargando producto..." />;

  const producto = products.find((item) => item.id === id);

  if (!producto) return <p>No encontramos ese producto.</p>;

  return (
    <div style={{ border: '1px solid var(--color-border)', padding: '20px', borderRadius: 'var(--radius)', maxWidth: '500px', margin: '20px auto', background: 'var(--color-surface)', boxShadow: 'var(--shadow)' }}>
      <h2>{producto.nombre}</h2>
      <p style={{ margin: '15px 0', color: 'var(--color-text-light)' }}>{producto.descripcion}</p>
      <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-primary-dark)' }}>${Number(producto.precio).toLocaleString('es-AR')} ARS</p>

      <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button onClick={() => cantidad > 1 && setCantidad(cantidad - 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>-</button>
        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cantidad}</span>
        <button onClick={() => setCantidad(cantidad + 1)} style={{ padding: '5px 10px', cursor: 'pointer' }}>+</button>
      </div>

      <button onClick={() => addToCart(producto, cantidad)} className="btn btn-primary" style={{ width: '100%' }}>
        Agregar al Carrito ({cantidad})
      </button>
    </div>
  );
};

const CarritoView = () => {
  const { cart, removeItem, clearCart, subtotal, totalPrice, cupon, cuponError, aplicarCupon, quitarCupon } = useContext(CartContext);
  const [codigoCupon, setCodigoCupon] = useState('');

  const handleAplicarCupon = (e) => {
    e.preventDefault();
    aplicarCupon(codigoCupon);
  };

  return (
    <div>
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? <p>El carrito está vacío.</p> : (
        <div>
          <button onClick={clearCart} className="btn btn-danger" style={{ marginBottom: '15px' }}>Vaciar Carrito</button>
          {cart.map((item) => (
            <div key={item.id} className="cart-item-row">
              <div><h4>{item.nombre} (x{item.quantity})</h4></div>
              <button onClick={() => removeItem(item.id)} className="btn btn-secondary">Quitar</button>
            </div>
          ))}

          <form className="coupon-box" onSubmit={handleAplicarCupon}>
            <input
              type="text"
              placeholder="Código de cupón"
              value={codigoCupon}
              onChange={(e) => setCodigoCupon(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Aplicar</button>
            {cupon && <button type="button" className="btn btn-secondary" onClick={() => { quitarCupon(); setCodigoCupon(''); }}>Quitar cupón</button>}
          </form>
          {cuponError && <p className="coupon-error">{cuponError}</p>}
          {cupon && <p className="coupon-applied">Cupón "{cupon.codigo}" aplicado: -{cupon.descuento * 100}%</p>}

          <p>Subtotal: ${subtotal().toLocaleString('es-AR')} ARS</p>
          <h3>Total a pagar: ${totalPrice().toLocaleString('es-AR')} ARS</h3>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Inicio />} />
                <Route path="productos" element={<Productos />} />
                <Route path="producto/:id" element={<ProductoDetalle />} />
                <Route path="carrito" element={<CarritoView />} />
                <Route path="login" element={<Login />} />
                <Route path="registro" element={<Register />} />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
