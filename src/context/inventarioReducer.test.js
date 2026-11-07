import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ACCIONES,
  ESTADO_INICIAL,
  inventarioReducer,
} from './inventarioReducer.js'
import { ARTICULOS_INICIALES, crearInventarioInicial } from '../data/inventarioInicial.js'

const articulo = {
  id: 'a1',
  nombre: 'Leche entera',
  marca: 'Colún',
  tipo: 'Lácteos',
  stock: 3,
}

function estadoBase() {
  return {
    articulos: [{ ...articulo }],
    carrito: [],
  }
}

test('el estado inicial contiene los seis artículos y un carrito vacío', () => {
  assert.equal(ESTADO_INICIAL.articulos.length, 6)
  assert.deepEqual(ESTADO_INICIAL.carrito, [])
  assert.equal(ARTICULOS_INICIALES.length, 6)

  const copia = crearInventarioInicial()
  assert.notEqual(copia, ARTICULOS_INICIALES)
  assert.notEqual(copia[0], ARTICULOS_INICIALES[0])
})

test('ADD_ARTICULO agrega sin mutar el estado anterior', () => {
  const estado = estadoBase()
  const nuevo = { ...articulo, id: 'a2', nombre: 'Pan amasado', tipo: 'Panadería' }
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.AGREGAR,
    payload: nuevo,
  })

  assert.equal(resultado.articulos.length, 2)
  assert.equal(estado.articulos.length, 1)
  assert.notEqual(resultado.articulos, estado.articulos)
})

test('ADD_TO_CART descuenta stock y agrega una unidad', () => {
  const estado = estadoBase()
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.AGREGAR_AL_CARRITO,
    payload: 'a1',
  })

  assert.equal(resultado.articulos[0].stock, 2)
  assert.deepEqual(resultado.carrito, [{ articuloId: 'a1', cantidad: 1 }])
  assert.equal(estado.articulos[0].stock, 3)
  assert.deepEqual(estado.carrito, [])
})

test('ADD_TO_CART no permite stock negativo', () => {
  const estado = {
    articulos: [{ ...articulo, stock: 0 }],
    carrito: [],
  }
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.AGREGAR_AL_CARRITO,
    payload: 'a1',
  })

  assert.equal(resultado, estado)
  assert.equal(resultado.articulos[0].stock, 0)
})

test('INCREMENT_CART descuenta stock y aumenta cantidad', () => {
  const estado = {
    articulos: [{ ...articulo, stock: 2 }],
    carrito: [{ articuloId: 'a1', cantidad: 1 }],
  }
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.INCREMENTAR_CARRITO,
    payload: 'a1',
  })

  assert.equal(resultado.articulos[0].stock, 1)
  assert.equal(resultado.carrito[0].cantidad, 2)
})

test('INCREMENT_CART no supera el stock disponible', () => {
  const estado = {
    articulos: [{ ...articulo, stock: 0 }],
    carrito: [{ articuloId: 'a1', cantidad: 3 }],
  }
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.INCREMENTAR_CARRITO,
    payload: 'a1',
  })

  assert.equal(resultado, estado)
})

test('DECREMENT_CART devuelve stock y elimina al llegar a una unidad', () => {
  const estado = {
    articulos: [{ ...articulo, stock: 1 }],
    carrito: [{ articuloId: 'a1', cantidad: 2 }],
  }
  const conUna = inventarioReducer(estado, {
    type: ACCIONES.DECREMENTAR_CARRITO,
    payload: 'a1',
  })

  assert.equal(conUna.articulos[0].stock, 2)
  assert.equal(conUna.carrito[0].cantidad, 1)

  const sinCarrito = inventarioReducer(conUna, {
    type: ACCIONES.DECREMENTAR_CARRITO,
    payload: 'a1',
  })

  assert.equal(sinCarrito.articulos[0].stock, 3)
  assert.deepEqual(sinCarrito.carrito, [])
})

test('REMOVE_FROM_CART restaura toda la cantidad al stock', () => {
  const estado = {
    articulos: [{ ...articulo, stock: 1 }],
    carrito: [{ articuloId: 'a1', cantidad: 2 }],
  }
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.ELIMINAR_DEL_CARRITO,
    payload: 'a1',
  })

  assert.equal(resultado.articulos[0].stock, 3)
  assert.deepEqual(resultado.carrito, [])
})

test('DELETE_ARTICULO elimina el artículo y su referencia del carrito', () => {
  const estado = {
    articulos: [{ ...articulo }],
    carrito: [{ articuloId: 'a1', cantidad: 2 }],
  }
  const resultado = inventarioReducer(estado, {
    type: ACCIONES.ELIMINAR,
    payload: 'a1',
  })

  assert.deepEqual(resultado.articulos, [])
  assert.deepEqual(resultado.carrito, [])
})
