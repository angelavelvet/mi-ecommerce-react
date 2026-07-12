import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loadingAuth } = useAuth();

  if (loadingAuth) return <Spinner mensaje="Verificando sesión..." />;
  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
