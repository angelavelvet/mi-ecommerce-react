import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import './Layout.css';

const Layout = () => {
  const equipo = [
    { nombre: 'Angela Eliana Armella Mamani', rol: 'Desarrolladora Frontend Principal' },
    { nombre: 'Carla Barrientos', rol: 'Diseñadora UI/UX' },
    { nombre: 'Enzo Gomez', rol: 'Project Manager' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header className="site-header">
        <h1 className="brand"><span>🧉</span> Bazar Nacional</h1>
        <p className="tagline">Mate, termos y bazar regional argentino — de acá para tu casa</p>
      </header>

      <NavBar />

      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer-brand">
          <h3>🧉 Bazar Nacional</h3>
          <p>Contacto: info@tiendanacional.com.ar | Buenos Aires, Argentina</p>
        </div>
        <div className="site-footer-team">
          {equipo.map((persona, index) => (
            <div key={index} className="team-card">
              <h5>{persona.nombre}</h5>
              <p>{persona.rol}</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
