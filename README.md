E-Commerce Nacional - Pre-Entrega React

¡Hola! Este es nuestro proyecto de e-commerce básico desarrollado en React para la primera pre-entrega. Armamos una tienda online enfocada 100% en el comercio local argentino, utilizando precios en pesos ($ ARS) y términos en español.

---

## 👥 Nuestro Equipo
 Angela Eliana Armella Mamani- Desarrolladora Frontend Principal
 Carla Barrientos- Diseñadora UI/UX
Enzo Gomez - Project Manager


## 🚀 ¿De qué se trata la página?
Es una tienda virtual de productos regionales y bazar. El catálogo actual incluye:
1. **Termo Autorrefrigerante 1L** ($45.000 ARS)
2. **Mate de Camionero de Alpaca** ($28.000 ARS)
3. **Bombilla de Acero Inoxidable** ($8.500 ARS)



## ⚙️ Requerimientos técnicos cumplidos
 **Estructura y Layout:** Contamos con un `Layout` persistente que une el encabezado, el menú y el pie de página con las tarjetas de los integrantes.
 **Catálogo dinámico:** Leemos los datos de un archivo local `productos.json` usando React Hooks.
  **Sistema de Ruteo:** Navegación fluida y sin recargas gestionada por `react-router-dom` (`/`, `/productos`, `/producto/:id`, `/carrito`).
 **Estado Global (Context API):** Lógica del carrito que suma cantidades y calcula totales en tiempo real a través de un `CartContext`.
 **Indicador en tiempo real:** Un `CartWidget` interactivo con un contador numérico de productos integrado en el menú de navegación.
 **Alojamiento en la nube:** Proyecto compilado y desplegado de forma online.



## 🔗 Enlaces del Proyecto
* **Sitio web en vivo (Netlify):** [Visitar Tienda](https://graceful-pudding-1db923.netlify.app)
