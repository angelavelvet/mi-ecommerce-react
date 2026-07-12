# E-Commerce Nacional - Entrega Final React

Tienda online de productos de bazar/regionales argentinos, desarrollada en React. Incluye catálogo dinámico contra Firestore, carrito de compras con Context API, autenticación de usuarios con Firebase Authentication y un panel de administración con CRUD completo de productos.

---

## 👥 Nuestro Equipo
- Angela Eliana Armella Mamani - Desarrolladora Frontend Principal
- Carla Barrientos - Diseñadora UI/UX
- Enzo Gomez - Project Manager

## 🔗 Enlaces del Proyecto
- **Sitio en vivo (Netlify):** https://graceful-pudding-1db923.netlify.app
- **Repositorio (GitHub):** https://github.com/angelavelvet/mi-ecommerce-react

## 🔑 Usuario para probar la Administración de Productos
Para ingresar a `/admin` hace falta una cuenta autenticada. Podés registrar una desde `/registro`, o usar la que se entregó en el Aula Virtual junto con esta entrega.

---

## ⚙️ Funcionalidades

- **Catálogo dinámico:** los productos se leen en tiempo real desde Firestore (`onSnapshot`).
- **Carrito de compras (Context API):** agregar, quitar y vaciar productos; cálculo de subtotal y total en tiempo real.
- **Cupones de descuento:** en `/carrito` se puede ingresar un código de cupón (`DESCUENTO10`, `BIENVENIDO15`, `MATE20`) que aplica un porcentaje de descuento sobre el subtotal.
- **Autenticación (Firebase Auth):** login y registro con email/contraseña. `AuthContext` expone el usuario actual en toda la app.
- **Rutas protegidas:** `/admin` solo es accesible para usuarios autenticados; si no hay sesión, redirige a `/login`.
- **CRUD de productos (Firestore):** alta, edición y baja de productos desde el panel de administración, con formulario controlado y validaciones (nombre obligatorio, precio > 0, categoría obligatoria).
- **Modal de confirmación** antes de eliminar un producto.
- **Spinners de carga** mientras se obtienen datos de Firestore o se verifica la sesión.
- **Manejo de errores:** mensajes visibles al usuario si falla la autenticación o la comunicación con Firestore.
- **Diseño responsivo:** layout con Flexbox (`display: flex`, `flex-wrap: wrap`) y media queries para mobile en el catálogo, la navbar, el panel de admin y el footer.

---

## 🧰 Tecnologías
- React 19 + React Router 7
- Firebase (Authentication + Firestore)
- Context API (Auth, Productos, Carrito)
- CSS (Flexbox + media queries)

---

## 💻 Instalación y ejecución local

### 1. Cloná el repositorio
```bash
git clone https://github.com/angelavelvet/mi-ecommerce-react.git
cd mi-ecommerce-react
```

### 2. Instalá las dependencias
```bash
npm install
```

### 3. Configurá tu proyecto de Firebase
Necesitás un proyecto propio de Firebase con **Authentication (Email/Password)** y **Firestore** habilitados:

1. Entrá a [Firebase Console](https://console.firebase.google.com/) → **Agregar proyecto**.
2. **Authentication → Sign-in method → Email/Password → Habilitar.**
3. **Firestore Database → Crear base de datos** (modo de prueba o con las reglas de `firestore.rules` de este repo).
4. **Configuración del proyecto → Tus apps → Web (`</>`)** para obtener el objeto `firebaseConfig`.

Copiá `.env.example` como `.env` en la raíz del proyecto y completá los valores:
```bash
cp .env.example .env
```
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=...
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
```

### 4. (Opcional) Cargá el catálogo inicial en Firestore
El repo incluye un catálogo de ejemplo en `src/productos.json`. Para subirlo a tu Firestore:
```bash
node scripts/seedProducts.js
```
También podés cargar productos manualmente desde el panel `/admin` una vez logueado.

### 5. Corré el proyecto en modo desarrollo
```bash
npm start
```
Abre [http://localhost:3000](http://localhost:3000).

### 6. Build de producción
```bash
npm run build
```

---

## 🚀 Despliegue
El sitio está desplegado en Netlify a partir del branch principal de este repositorio. Para que la app funcione en producción, las mismas variables de entorno de `.env` deben configurarse en **Netlify → Site settings → Environment variables**.

---

## 🗂️ Estructura principal
```
src/
├── firebase.js              # Inicialización de Firebase (Auth + Firestore)
├── CartContext.js           # Context del carrito (agregar/quitar/vaciar, cupones)
├── context/
│   ├── AuthContext.jsx      # Context de autenticación
│   └── ProductContext.jsx   # Context de productos (CRUD contra Firestore)
├── components/
│   ├── Layout.jsx, NavBar.jsx
│   ├── ProtectedRoute.jsx
│   ├── ProductForm.jsx
│   ├── ConfirmModal.jsx
│   └── Spinner.jsx
├── pages/
│   ├── Login.jsx, Register.jsx
│   └── AdminPanel.jsx
└── App.js                   # Rutas de la aplicación
```

## ✅ Compatibilidad
Probado en las últimas versiones de Chrome, Firefox y Edge.
