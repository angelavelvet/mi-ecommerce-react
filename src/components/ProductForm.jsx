import React, { useState } from 'react';
import './ProductForm.css';

const initialState = { nombre: '', precio: '', descripcion: '', categoria: '', imagen: '' };

const ProductForm = ({ productoInicial, onSubmit, onCancel }) => {
  const [valores, setValores] = useState(productoInicial || initialState);
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!valores.nombre || !valores.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    const precioNumerico = Number(valores.precio);
    if (!valores.precio || isNaN(precioNumerico) || precioNumerico <= 0) {
      nuevosErrores.precio = 'El precio debe ser un número mayor a 0.';
    }
    if (!valores.categoria || !valores.categoria.trim()) {
      nuevosErrores.categoria = 'La categoría es obligatoria.';
    }
    if (!valores.imagen || !valores.imagen.trim()) {
      nuevosErrores.imagen = 'Pegá la URL de una imagen para el producto.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setGuardando(true);
    try {
      await onSubmit({
        nombre: valores.nombre.trim(),
        precio: Number(valores.precio),
        descripcion: valores.descripcion.trim(),
        categoria: valores.categoria.trim(),
        imagen: valores.imagen.trim(),
      });
      setValores(initialState);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>{productoInicial ? 'Editar producto' : 'Agregar producto'}</h3>

      <label htmlFor="nombre">Nombre *</label>
      <input id="nombre" name="nombre" value={valores.nombre} onChange={handleChange} />
      {errores.nombre && <span className="field-error">{errores.nombre}</span>}

      <label htmlFor="precio">Precio (ARS) *</label>
      <input id="precio" name="precio" type="number" min="0" step="1" value={valores.precio} onChange={handleChange} />
      {errores.precio && <span className="field-error">{errores.precio}</span>}

      <label htmlFor="categoria">Categoría *</label>
      <input id="categoria" name="categoria" value={valores.categoria} onChange={handleChange} />
      {errores.categoria && <span className="field-error">{errores.categoria}</span>}

      <label htmlFor="imagen">URL de la imagen *</label>
      <input id="imagen" name="imagen" placeholder="https://..." value={valores.imagen} onChange={handleChange} />
      {errores.imagen && <span className="field-error">{errores.imagen}</span>}
      {valores.imagen && (
        <img
          src={valores.imagen}
          alt="Vista previa"
          className="product-form-preview"
          onError={(e) => { e.target.style.display = 'none'; }}
          onLoad={(e) => { e.target.style.display = 'block'; }}
        />
      )}

      <label htmlFor="descripcion">Descripción</label>
      <textarea id="descripcion" name="descripcion" rows={3} value={valores.descripcion} onChange={handleChange} />

      <div className="product-form-actions">
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={guardando}>
            Cancelar
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={guardando}>
          {guardando ? 'Guardando...' : productoInicial ? 'Guardar cambios' : 'Agregar producto'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
