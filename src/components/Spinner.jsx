import React from 'react';
import './Spinner.css';

const Spinner = ({ mensaje = 'Cargando...' }) => (
  <div className="spinner-container">
    <div className="spinner" />
    <p>{mensaje}</p>
  </div>
);

export default Spinner;
