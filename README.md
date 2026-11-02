# Súper Fresco 🛒

SPA de supermercado desarrollada para **Desarrollo Frontend II (PFY2202)**. La Semana 1 construyó
la navegación y las páginas institucionales; la Semana 2 agrega gestión global de inventario y
Tailwind CSS.

## Sitio publicado

[Ver la aplicación en GitHub Pages](https://cristianjtm.github.io/Exp1_S2_Cristian_Torres_DESARROLLO-FRONTEND-II_004A/)

## Stack

- React 18.3.1
- React Router DOM 6.30.6
- Vite 5
- Tailwind CSS 3.4.17 en las páginas nuevas
- CSS Modules en los componentes de Semana 1
- Sin backend ni APIs externas

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`.

Para generar y revisar la versión de producción:

```bash
npm run build
npm run preview
```

## Rutas

| Ruta | Vista | Etiqueta del navbar |
| --- | --- | --- |
| `/` | Home | Inicio |
| `/quienes-somos` | QuienesSomos | Nosotros |
| `/contacto` | Contacto | Contacto |
| `/inventario/agregar` | AgregarArticulo | Agregar |
| `/inventario/lista` | ListaInventario | Lista |
| `*` | NotFound | — |

Toda la navegación interna usa `Link` y `NavLink`. El navbar se renderiza dentro de `AppLayout`
mediante `<Outlet />`, por lo que permanece visible en todas las vistas.

## Estado global de inventario

`InventarioContext` usa `useReducer` y `useContext`. El Provider envuelve toda la aplicación en
`App.jsx`.

El estado global es un array de artículos:

```js
[
  {
    id: 'uuid',
    nombre: 'Leche entera',
    marca: 'Colún',
    tipo: 'Lácteos',
  },
]
```

Acciones del reducer:

- `ADD_ARTICULO`: recibe el artículo completo.
- `DELETE_ARTICULO`: recibe el `id`.

El estado vive en memoria: al recargar la página se reinicia. La persistencia no forma parte de los
requerimientos de esta actividad.

## Arquitectura

| Capa | Responsabilidad |
| --- | --- |
| `src/context/` | Contexto, Provider, hook `useInventario`, reducer y acciones |
| `src/pages/` | Composición de vistas |
| `src/components/layout/` | Navbar, Footer, AppLayout y ScrollToTop |
| `src/components/ui/` | Componentes compartidos de Semana 1 |
| `src/components/home`, `about`, `contact`, `products` | Secciones de dominio de Semana 1 |
| `src/components/inventario/` | Cabecera y tabla de inventario |
| `src/data/` | Contenido estático, navegación y tipos de artículo |
| `src/hooks/` | Estado del formulario de contacto |
| `src/utils/` | Validación y formato de moneda |
| `src/styles/` | Tokens, reset, layout, utilidades globales y entrada de Tailwind |

## Estructura

```text
src/
├─ context/
│  ├─ InventarioContext.jsx
│  └─ inventarioReducer.js
│
├─ pages/
│  ├─ Home.jsx
│  ├─ QuienesSomos.jsx
│  ├─ Contacto.jsx
│  ├─ AgregarArticulo.jsx
│  ├─ ListaInventario.jsx
│  └─ NotFound.jsx
│
├─ components/
│  ├─ layout/
│  │  ├─ AppLayout.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Footer.jsx
│  │  └─ ScrollToTop.jsx
│  ├─ ui/
│  │  ├─ PageHero.jsx
│  │  ├─ SectionHead.jsx
│  │  ├─ CtaBand.jsx
│  │  └─ StatList.jsx
│  ├─ home/
│  ├─ about/
│  ├─ contact/
│  ├─ products/
│  └─ inventario/
│     ├─ InventarioHeader.jsx
│     └─ TablaInventario.jsx
│
├─ data/
│  ├─ navegacion.js
│  ├─ sitio.js
│  ├─ home.js
│  ├─ quienesSomos.js
│  ├─ contacto.js
│  ├─ productos.js
│  ├─ equipo.js
│  └─ inventario.js
│
├─ hooks/
│  └─ useContactForm.js
│
├─ utils/
│  ├─ validacion.js
│  └─ formatoMoneda.js
│
├─ styles/
│  ├─ tokens.css
│  ├─ base.css
│  ├─ layout.css
│  ├─ utilities.css
│  └─ tailwind.css
│
├─ App.jsx
└─ main.jsx
```

## Tailwind CSS

Tailwind v3 se integra con Vite mediante PostCSS:

- `tailwind.config.js`: `content` apunta a `index.html` y `src/**/*.{js,jsx}`.
- `postcss.config.js`: plugins `tailwindcss` y `autoprefixer`.
- `src/styles/tailwind.css`: directivas `@tailwind base`, `@tailwind components` y
  `@tailwind utilities`.
- `src/main.jsx` importa Tailwind después de los estilos globales de Semana 1.

Para proteger la interfaz existente:

- `preflight: false`: Tailwind no reemplaza el reset de `styles/base.css`.
- `container: false`: evita la colisión con la clase global `.container` de Semana 1.
- Los CSS Modules de Semana 1 no se modificaron.
- Las páginas de inventario usan utilidades Tailwind y el tema `sf` definido en la configuración.

## Despliegue en GitHub Pages

```bash
npm run deploy
```

`predeploy` ejecuta el build, `postbuild` genera `dist/404.html` para el fallback de
`BrowserRouter` y `gh-pages` publica `dist/` en la rama `gh-pages` con `.nojekyll`.

URL del sitio:

```text
https://cristianjtm.github.io/Exp1_S2_Cristian_Torres_DESARROLLO-FRONTEND-II_004A/
```

## Notas

- No hay backend ni llamadas a APIs.
- El formulario de contacto no envía datos a ningún servidor.
- El navbar inferior tiene cinco ítems con etiquetas cortas y nombres accesibles completos.
- El estado de inventario se conserva al navegar entre rutas, pero se reinicia al recargar.
- El proyecto usa `BrowserRouter` con `basename` y fallback `404.html` para GitHub Pages.

## Autor

Cristian Torres — Proyecto académico PFY2202.
