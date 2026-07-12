import React from 'react';
import './ConfirmModal.css';

const ConfirmModal = ({ titulo, mensaje, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>{titulo}</h3>
      <p>{mensaje}</p>
      <div className="modal-actions">
        <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
