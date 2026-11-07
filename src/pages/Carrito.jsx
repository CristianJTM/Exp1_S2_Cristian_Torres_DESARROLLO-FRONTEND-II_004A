import { useMemo } from 'react'
import { Link } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import TablaCarrito from '../components/carrito/TablaCarrito.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import {
  contarUnidadesCarrito,
  obtenerCarritoDetallado,
} from '../utils/inventario.js'

export default function Carrito() {
  const { articulos, carrito, dispatch } = useInventario()
  const items = useMemo(
    () => obtenerCarritoDetallado(articulos, carrito),
    [articulos, carrito],
  )
  const totalUnidades = contarUnidadesCarrito(carrito)

  function incrementar(articuloId) {
    dispatch({ type: ACCIONES.INCREMENTAR_CARRITO, payload: articuloId })
  }

  function decrementar(articuloId) {
    dispatch({ type: ACCIONES.DECREMENTAR_CARRITO, payload: articuloId })
  }

  function eliminar(articuloId) {
    dispatch({ type: ACCIONES.ELIMINAR_DEL_CARRITO, payload: articuloId })
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <InventarioHeader
          eyebrow="Carrito"
          title="Carrito de compras"
          lead="Ajusta las cantidades y revisa el stock restante de cada artículo."
        />
        <Link
          to="/inventario/lista"
          className="inline-flex items-center justify-center rounded-full border border-solid border-sf-border px-5 py-3 text-sm font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
        >
          Seguir comprando
        </Link>
      </div>

      <p className="mt-6 mb-0 text-sm font-semibold text-sf-muted" aria-live="polite">
        {totalUnidades} {totalUnidades === 1 ? 'unidad en el carrito' : 'unidades en el carrito'}
      </p>

      {items.length === 0 ? (
        <div className="mt-4 rounded-3xl border border-dashed border-sf-border bg-white p-10 text-center">
          <p className="mb-0 text-lg font-bold text-sf-text">Tu carrito está vacío</p>
          <p className="mt-2 mb-0 text-sm text-sf-muted">
            Agrega artículos desde el detalle de cada producto.
          </p>
          <Link
            to="/inventario/lista"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40"
          >
            Ver inventario
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          <TablaCarrito
            items={items}
            onIncrementar={incrementar}
            onDecrementar={decrementar}
            onEliminar={eliminar}
          />
        </div>
      )}
    </section>
  )
}
