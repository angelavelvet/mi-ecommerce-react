import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';

const NavBar = () => {
  const { totalQuantity } = useContext(CartContext);
  const cantidad = totalQuantity();

  return (
    <nav style={{ background: '#f8f9fa', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd' }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Inicio</Link>
        <Link to="/productos" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>Catálogo</Link>
      </div>
      <Link to="/carrito" style={{ textDecoration: 'none', color: '#212529', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span>🛒</span>
        {cantidad > 0 && (
          <span style={{ background: '#dc3545', color: '#fff', borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' }}>
            {cantidad}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default NavBar;
