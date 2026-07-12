/*
 * Sube el catálogo inicial (src/productos.json) a la colección "productos" de Firestore.
 * Uso: completar .env con las credenciales de Firebase y correr:
 *   node scripts/seedProducts.js
 */
require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const productos = require('../src/productos.json');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  const coleccion = collection(db, 'productos');
  for (const { id, ...producto } of productos) {
    await addDoc(coleccion, producto);
    console.log(`Producto agregado: ${producto.nombre}`);
  }
  console.log('Listo. Catálogo cargado en Firestore.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error cargando el catálogo:', err);
  process.exit(1);
});
