import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import ProductForm from '../components/ProductForm';
import ConfirmModal from '../components/ConfirmModal';
import Spinner from '../components/Spinner';
import './AdminPanel.css';

const AdminPanel = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const { currentUser, logout } = useAuth();
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [accionError, setAccionError] = useState(null);

  const handleCrear = async (producto) => {
    setAccionError(null);
    try {
      await addProduct(producto);
    } catch (err) {
      setAccionError('No se pudo guardar el producto. Intentá de nuevo.');
    }
  };

  const handleActualizar = async (producto) => {
    setAccionError(null);
    try {
      await updateProduct(productoEditando.id, producto);
      setProductoEditando(null);
    } catch (err) {
      setAccionError('No se pudo actualizar el producto. Intentá de nuevo.');
    }
  };

  const confirmarEliminar = async () => {
    setAccionError(null);
    try {
      await deleteProduct(productoAEliminar.id);
    } catch (err) {
      setAccionError('No se pudo eliminar el producto. Intentá de nuevo.');
    } finally {
      setProductoAEliminar(null);
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Administración de Productos</h2>
        <div className="admin-user-info">
          <span>{currentUser?.email}</span>
          <button className="btn btn-secondary" onClick={logout}>Cerrar sesión</button>
        </div>
      </div>

      {accionError && <p className="auth-error">{accionError}</p>}

      <ProductForm
        key={productoEditando?.id || 'nuevo'}
        productoInicial={productoEditando}
        onSubmit={productoEditando ? handleActualizar : handleCrear}
        onCancel={productoEditando ? () => setProductoEditando(null) : null}
      />

      <h3 className="admin-list-title">Catálogo actual</h3>

      {loading && <Spinner mensaje="Cargando productos..." />}
      {error && <p className="auth-error">{error}</p>}

      {!loading && !error && (
        <div className="admin-product-list">
          {products.length === 0 && <p>Todavía no hay productos cargados.</p>}
          {products.map((prod) => (
            <div key={prod.id} className="admin-product-row">
              <div className="admin-product-info">
                {prod.imagen && <img src={prod.imagen} alt={prod.nombre} className="admin-product-thumb" />}
                <div>
                  <strong>{prod.nombre}</strong>
                  <span className="admin-product-meta"> — ${Number(prod.precio).toLocaleString('es-AR')} ARS — {prod.categoria}</span>
                </div>
              </div>
              <div className="admin-product-actions">
                <button className="btn btn-secondary" onClick={() => setProductoEditando(prod)}>Editar</button>
                <button className="btn btn-danger" onClick={() => setProductoAEliminar(prod)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {productoAEliminar && (
        <ConfirmModal
          titulo="Eliminar producto"
          mensaje={`¿Seguro que querés eliminar "${productoAEliminar.nombre}"? Esta acción no se puede deshacer.`}
          onConfirm={confirmarEliminar}
          onCancel={() => setProductoAEliminar(null)}
        />
      )}
    </div>
  );
};

export default AdminPanel;
