/*
 * Exporta el estado actual de la colección "productos" de Firestore
 * a src/productos.json (referencia local / catálogo de ejemplo para el seed).
 * Uso: node scripts/exportProducts.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore');

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

async function exportar() {
  const q = query(collection(db, 'productos'), orderBy('nombre'));
  const snapshot = await getDocs(q);

  const productos = snapshot.docs.map((doc, index) => {
    const data = doc.data();
    return {
      id: index + 1,
      nombre: data.nombre,
      precio: data.precio,
      descripcion: data.descripcion || '',
      categoria: data.categoria || '',
      imagen: data.imagen || '',
    };
  });

  const destino = path.join(__dirname, '..', 'src', 'productos.json');
  fs.writeFileSync(destino, JSON.stringify(productos, null, 2) + '\n');
  console.log(`Listo. ${productos.length} productos exportados a src/productos.json`);
  process.exit(0);
}

exportar().catch((err) => {
  console.error('Error exportando productos:', err);
  process.exit(1);
});
