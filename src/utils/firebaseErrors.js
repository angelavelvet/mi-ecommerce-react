const MENSAJES = {
  'auth/email-already-in-use': 'Ese email ya está registrado.',
  'auth/invalid-email': 'El email ingresado no es válido.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/invalid-credential': 'Email o contraseña incorrectos.',
  'auth/user-not-found': 'Email o contraseña incorrectos.',
  'auth/wrong-password': 'Email o contraseña incorrectos.',
  'auth/too-many-requests': 'Demasiados intentos. Probá de nuevo más tarde.',
};

export const traducirErrorFirebase = (error) => {
  const codigo = error?.code || '';
  return MENSAJES[codigo] || 'Ocurrió un error. Intentá de nuevo.';
};
