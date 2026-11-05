/** @type {import('tailwindcss').Config} */
const sfColor = (name) => `rgb(var(--color-${name}-rgb) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    // S1 ya tiene su propio reset en styles/base.css.
    preflight: false,
    // S1 usa la clase global .container en todas sus páginas.
    container: false,
  },
  theme: {
    extend: {
      colors: {
        sf: {
          green: sfColor('primary'),
          dark: sfColor('primary-dark'),
          soft: sfColor('primary-soft'),
          accent: sfColor('accent'),
          cream: sfColor('bg'),
          sand: sfColor('bg-muted'),
          surface: sfColor('surface'),
          text: sfColor('text'),
          muted: sfColor('muted'),
          border: sfColor('border'),
          error: sfColor('error'),
        },
      },
    },
  },
  plugins: [],
}
