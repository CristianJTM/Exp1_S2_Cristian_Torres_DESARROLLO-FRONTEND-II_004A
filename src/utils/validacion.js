import { TIPOS_ARTICULO } from '../data/inventario.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TELEFONO_REGEX = /^\+?[\d\s]{8,15}$/
const TEXTO_PERMITIDO = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9 .,'&()/-]+$/
const TIENE_LETRA = /[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/
const LARGO_MIN = 2
const LARGO_MAX = 60

export function validarContacto(form) {
  const errores = {}

  if (form.nombre.trim().length < 2) {
    errores.nombre = 'Ingresa tu nombre completo.'
  }

  if (!EMAIL_REGEX.test(form.email.trim())) {
    errores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.cl.'
  }

  if (form.telefono.trim() && !TELEFONO_REGEX.test(form.telefono.trim())) {
    errores.telefono = 'Ingresa un teléfono válido o deja el campo vacío.'
  }

  if (form.mensaje.trim().length < 10) {
    errores.mensaje = 'Cuéntanos un poco más (mínimo 10 caracteres).'
  }

  return errores
}

export function normalizarTexto(valor) {
  return String(valor ?? '')
    .trim()
    .replace(/\s+/g, ' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function validarArticulo(form, articulos = []) {
  const errores = {}
  const nombre = String(form.nombre ?? '').trim()
  const marca = String(form.marca ?? '').trim()
  const tipo = String(form.tipo ?? '').trim()

  if (nombre.length < LARGO_MIN || nombre.length > LARGO_MAX) {
    errores.nombre = 'Ingresa un nombre de 2 a 60 caracteres.'
  } else if (!TEXTO_PERMITIDO.test(nombre) || !TIENE_LETRA.test(nombre)) {
    errores.nombre = 'El nombre debe contener al menos una letra y caracteres válidos.'
  }

  if (marca.length < LARGO_MIN || marca.length > LARGO_MAX) {
    errores.marca = 'Ingresa una marca de 2 a 60 caracteres.'
  } else if (!TEXTO_PERMITIDO.test(marca) || !TIENE_LETRA.test(marca)) {
    errores.marca = 'La marca debe contener al menos una letra y caracteres válidos.'
  }

  if (!TIPOS_ARTICULO.includes(tipo)) {
    errores.tipo = 'Selecciona un tipo de artículo válido.'
  }

  if (!errores.nombre && !errores.marca) {
    const nombreNormalizado = normalizarTexto(nombre)
    const marcaNormalizada = normalizarTexto(marca)
    const existe = articulos.some(
      (articulo) =>
        normalizarTexto(articulo.nombre) === nombreNormalizado &&
        normalizarTexto(articulo.marca) === marcaNormalizada,
    )

    if (existe) {
      errores.duplicado = 'Ya existe un artículo con ese nombre y marca.'
    }
  }

  return errores
}
