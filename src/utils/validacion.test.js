import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizarTexto, validarArticulo, validarContacto } from './validacion.js'

const articuloBase = {
  nombre: 'Leche entera',
  marca: 'Colún',
  tipo: 'Lácteos',
}

test('acepta artículos válidos', () => {
  assert.deepEqual(validarArticulo(articuloBase), {})
  assert.deepEqual(
    validarArticulo({ ...articuloBase, nombre: '3 cereales', marca: 'Coca-Cola' }),
    {},
  )
  assert.deepEqual(validarArticulo({ ...articuloBase, nombre: 'Pan de molde' }), {})
})

test('rechaza nombre o marca vacíos, solo espacios, solo números o solo signos', () => {
  const invalidos = ['', '   ', '12345', '!!!', 'Leche @', 'A']

  for (const valor of invalidos) {
    const erroresNombre = validarArticulo({ ...articuloBase, nombre: valor })
    const erroresMarca = validarArticulo({ ...articuloBase, marca: valor })

    assert.ok(erroresNombre.nombre, `Debe rechazar nombre: ${JSON.stringify(valor)}`)
    assert.ok(erroresMarca.marca, `Debe rechazar marca: ${JSON.stringify(valor)}`)
  }
})

test('rechaza nombres demasiado largos', () => {
  const errores = validarArticulo({
    ...articuloBase,
    nombre: 'A'.repeat(61),
  })

  assert.ok(errores.nombre)
})

test('valida que el tipo pertenezca a TIPOS_ARTICULO', () => {
  const errores = validarArticulo({ ...articuloBase, tipo: 'Otros' })
  assert.equal(errores.tipo, 'Selecciona un tipo de artículo válido.')
})

test('detecta duplicados por nombre y marca sin distinguir mayúsculas ni tildes', () => {
  const existentes = [articuloBase]
  const errores = validarArticulo(
    { ...articuloBase, nombre: 'leche ENTERA', marca: 'colun' },
    existentes,
  )

  assert.ok(errores.duplicado)
})

test('permite distinto nombre o distinta marca', () => {
  const existentes = [articuloBase]

  assert.deepEqual(
    validarArticulo({ ...articuloBase, nombre: 'Leche descremada' }, existentes),
    {},
  )
  assert.deepEqual(validarArticulo({ ...articuloBase, marca: 'Soprole' }, existentes), {})
})

test('normaliza espacios, mayúsculas y tildes', () => {
  assert.equal(normalizarTexto('  Colún   entera  '), 'colun entera')
})

test('validarContacto conserva sus reglas', () => {
  const valido = {
    nombre: 'Cristian Torres',
    email: 'cristian@correo.cl',
    telefono: '+56 9 1234 5678',
    mensaje: 'Mensaje de prueba con más de diez caracteres.',
  }

  assert.deepEqual(validarContacto(valido), {})
  assert.ok(validarContacto({ ...valido, email: 'correo-invalido' }).email)
  assert.ok(validarContacto({ ...valido, telefono: '12abc' }).telefono)
  assert.ok(validarContacto({ ...valido, mensaje: 'corto' }).mensaje)
  assert.ok(validarContacto({}).nombre)
})
