import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { traducirErrorFirebase } from '../utils/firebaseErrors';
import './AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje(null);
    setEnviando(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(traducirErrorFirebase(err));
    } finally {
      setEnviando(false);
    }
  };

  const handleOlvideContrasena = async () => {
    setError(null);
    setMensaje(null);
    if (!email) {
      setError('Escribí tu email arriba y volvé a tocar "¿Olvidaste tu contraseña?".');
      return;
    }
    try {
      await resetPassword(email);
      setMensaje('Te enviamos un email para restablecer tu contraseña.');
    } catch (err) {
      setError(traducirErrorFirebase(err));
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="auth-error">{error}</p>}
        {mensaje && <p className="auth-success">{mensaje}</p>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit" className="btn btn-primary" disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>
        <button type="button" className="auth-link-button" onClick={handleOlvideContrasena}>
          ¿Olvidaste tu contraseña?
        </button>
        <p className="auth-switch">
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
