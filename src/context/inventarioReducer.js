import { crearInventarioInicial } from '../data/inventarioInicial.js'

export const ESTADO_INICIAL = {
  articulos: crearInventarioInicial(),
  carrito: [],
}

export const ACCIONES = {
  AGREGAR: 'ADD_ARTICULO',
  ELIMINAR: 'DELETE_ARTICULO',
  AGREGAR_AL_CARRITO: 'ADD_TO_CART',
  INCREMENTAR_CARRITO: 'INCREMENT_CART',
  DECREMENTAR_CARRITO: 'DECREMENT_CART',
  ELIMINAR_DEL_CARRITO: 'REMOVE_FROM_CART',
}

export function inventarioReducer(state, action) {
  switch (action.type) {
    case ACCIONES.AGREGAR:
      return {
        ...state,
        articulos: [...state.articulos, action.payload],
      }

    case ACCIONES.ELIMINAR:
      return {
        ...state,
        articulos: state.articulos.filter((articulo) => articulo.id !== action.payload),
        carrito: state.carrito.filter((item) => item.articuloId !== action.payload),
      }

    case ACCIONES.AGREGAR_AL_CARRITO: {
      const articulo = state.articulos.find((item) => item.id === action.payload)

      if (!articulo || articulo.stock <= 0) {
        return state
      }

      const articulos = state.articulos.map((item) =>
        item.id === articulo.id ? { ...item, stock: item.stock - 1 } : item,
      )
      const existeEnCarrito = state.carrito.find(
        (item) => item.articuloId === articulo.id,
      )
      const carrito = existeEnCarrito
        ? state.carrito.map((item) =>
            item.articuloId === articulo.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item,
          )
        : [...state.carrito, { articuloId: articulo.id, cantidad: 1 }]

      return { ...state, articulos, carrito }
    }

    case ACCIONES.INCREMENTAR_CARRITO: {
      const itemCarrito = state.carrito.find(
        (item) => item.articuloId === action.payload,
      )

      if (!itemCarrito) {
        return state
      }

      const articulo = state.articulos.find((item) => item.id === action.payload)

      if (!articulo || articulo.stock <= 0) {
        return state
      }

      return {
        ...state,
        articulos: state.articulos.map((item) =>
          item.id === articulo.id ? { ...item, stock: item.stock - 1 } : item,
        ),
        carrito: state.carrito.map((item) =>
          item.articuloId === articulo.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item,
        ),
      }
    }

    case ACCIONES.DECREMENTAR_CARRITO: {
      const itemCarrito = state.carrito.find(
        (item) => item.articuloId === action.payload,
      )

      if (!itemCarrito) {
        return state
      }

      const articulo = state.articulos.find((item) => item.id === action.payload)

      if (!articulo) {
        return {
          ...state,
          carrito: state.carrito.filter(
            (item) => item.articuloId !== action.payload,
          ),
        }
      }

      const articulos = state.articulos.map((item) =>
        item.id === articulo.id ? { ...item, stock: item.stock + 1 } : item,
      )
      const carrito =
        itemCarrito.cantidad > 1
          ? state.carrito.map((item) =>
              item.articuloId === articulo.id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item,
            )
          : state.carrito.filter((item) => item.articuloId !== articulo.id)

      return { ...state, articulos, carrito }
    }

    case ACCIONES.ELIMINAR_DEL_CARRITO: {
      const itemCarrito = state.carrito.find(
        (item) => item.articuloId === action.payload,
      )

      if (!itemCarrito) {
        return state
      }

      return {
        ...state,
        articulos: state.articulos.map((item) =>
          item.id === itemCarrito.articuloId
            ? { ...item, stock: item.stock + itemCarrito.cantidad }
            : item,
        ),
        carrito: state.carrito.filter(
          (item) => item.articuloId !== action.payload,
        ),
      }
    }

    default:
      return state
  }
}
