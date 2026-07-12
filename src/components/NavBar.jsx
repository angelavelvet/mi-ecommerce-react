import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { useAuth } from '../context/AuthContext';
import './NavBar.css';

const NavBar = () => {
  const { totalQuantity } = useContext(CartContext);
  const { currentUser, logout } = useAuth();
  const cantidad = totalQuantity();

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Inicio</Link>
        <Link to="/productos" className="navbar-link">Catálogo</Link>
        {currentUser && (
          <Link to="/admin" className="navbar-link admin-link">Administración</Link>
        )}
      </div>
      <div className="navbar-actions">
        {currentUser ? (
          <button onClick={logout} className="btn btn-secondary">Cerrar sesión</button>
        ) : (
          <Link to="/login" className="navbar-login-link">Ingresar</Link>
        )}
        <Link to="/carrito" className="navbar-cart">
          <span>🛒</span>
          {cantidad > 0 && <span className="navbar-cart-badge">{cantidad}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
