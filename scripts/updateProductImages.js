/*
 * Actualiza los productos ya existentes en Firestore agregándoles el campo "imagen",
 * usando src/productos.json como referencia (matchea por nombre).
 * Uso: node scripts/updateProductImages.js
 */
require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');
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

async function actualizar() {
  const snapshot = await getDocs(collection(db, 'productos'));
  let actualizados = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();

    const referencia = productos.find((p) => p.nombre === data.nombre);
    if (!referencia) {
      console.log(`Sin imagen de referencia para: ${data.nombre}`);
      continue;
    }

    await updateDoc(doc(db, 'productos', docSnap.id), { imagen: referencia.imagen });
    console.log(`Imagen agregada: ${data.nombre}`);
    actualizados++;
  }

  console.log(`Listo. ${actualizados} productos actualizados.`);
  process.exit(0);
}

actualizar().catch((err) => {
  console.error('Error actualizando imágenes:', err);
  process.exit(1);
});
