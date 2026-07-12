# Bazar Nacional 🧉

Proyecto final de la cursada: una tienda online de mates, termos y bazar de acá. Arrancó como un catálogo simple con datos hardcodeados y en esta entrega le sumamos autenticación de usuarios, carrito de compras, y un panel de administración conectado a Firebase para poder gestionar los productos de verdad.

## Equipo
- Angela Eliana Armella Mamani - Desarrolladora Frontend Principal
- Carla Barrientos - Diseñadora UI/UX
- Enzo Gomez - Project Manager

## Links
- Sitio: https://graceful-pudding-1db923.netlify.app
- Repo: https://github.com/angelavelvet/mi-ecommerce-react

Para entrar al panel de administración (`/admin`) hace falta estar logueado. El usuario de prueba se entregó aparte en el Aula Virtual; también se puede crear uno nuevo desde `/registro`.

## Qué tiene

- Catálogo de productos que se lee en tiempo real de Firestore.
- Carrito con Context API: agregar, sacar y vaciar productos, con cupones de descuento (`DESCUENTO10`, `BIENVENIDO15`, `MATE20`).
- Login, registro y recuperación de contraseña con Firebase Authentication.
- La ruta `/admin` está protegida: si no iniciaste sesión te manda a `/login`.
- Desde el panel de admin se pueden agregar, editar y eliminar productos (con validación de campos y un modal para confirmar antes de borrar).
- Spinners mientras carga y mensajes de error si falla algo con Firestore o el login.
- Diseño responsive con Flexbox y media queries.

## Tecnologías
React 19, React Router, Firebase (Authentication + Firestore) y Context API para el manejo de estado global.

## Instalación local

Cloná el repo e instalá las dependencias:

```bash
git clone https://github.com/angelavelvet/mi-ecommerce-react.git
cd mi-ecommerce-react
npm install
```

Necesitás tu propio proyecto de Firebase con Authentication (método Email/Password) y Firestore habilitados. Una vez que lo tengas, copiá `.env.example` a `.env` y completá con los datos de tu proyecto (los sacás de Firebase Console → Configuración del proyecto → Tus apps):

```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

Para cargar el catálogo de ejemplo (22 productos) en tu Firestore, corré:

```bash
node scripts/seedProducts.js
```

Y ya podés levantar el proyecto:

```bash
npm start
```

Se abre en http://localhost:3000.

## Despliegue

El sitio está subido a Netlify con Netlify Drop (se genera el build local y se arrastra la carpeta a mano, no está enganchado a un deploy automático de GitHub). Para actualizarlo después de un cambio:

```bash
npm run build
```

y se arrastra la carpeta `build` resultante a la sección Deploys del proyecto en Netlify.

## Estructura

El código está en `src/`, separado en `context/` (Auth, Productos, Carrito), `components/` (Layout, NavBar, formularios, modal de confirmación, spinner) y `pages/` (Login, Registro, panel de Admin). El script para cargar productos a Firestore está en `scripts/seedProducts.js`, y las reglas de seguridad sugeridas para Firestore en `firestore.rules`.
