import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';

export const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const productsCollection = collection(db, 'productos');

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const q = query(productsCollection, orderBy('nombre'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error(err);
        setError('No se pudieron cargar los productos. Intentá de nuevo más tarde.');
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const addProduct = async (producto) => {
    await addDoc(productsCollection, producto);
  };

  const updateProduct = async (id, producto) => {
    await updateDoc(doc(db, 'productos', id), producto);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'productos', id));
  };

  return (
    <ProductContext.Provider
      value={{ products, loading, error, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
