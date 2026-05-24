import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  const equipo = [
    { nombre: 'Angela Eliana Armella Mamani', rol: 'Desarrolladora Frontend Principal' },
    { nombre: 'Carla Barrientos', rol: 'Diseñadora UI/UX' },
    { nombre: 'Enzo Gomez', rol: 'Project Manager' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ background: '#212529', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>Tienda E-Commerce Nacional 🇦🇷</h1>
      </header>
      
      <NavBar />
      
      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>

      <footer style={{ background: '#212529', color: '#fff', padding: '20px', marginTop: 'auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
          <h3>E-Commerce Nacional S.A.</h3>
          <p>Contacto: info@tiendanacional.com.ar | Buenos Aires, Argentina</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {equipo.map((persona, index) => (
            <div key={index} style={{ background: '#343a40', padding: '10px 15px', borderRadius: '5px', textAlign: 'center', minWidth: '220px', border: '1px solid #495057' }}>
              <h5 style={{ margin: '0 0 5px 0', color: '#17a2b8' }}>{persona.nombre}</h5>
              <p style={{ margin: 0, fontSize: '12px', color: '#ccc' }}>{persona.rol}</p>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
