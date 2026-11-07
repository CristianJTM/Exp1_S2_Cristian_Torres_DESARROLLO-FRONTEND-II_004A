import { useState } from 'react'
import { Link, useParams } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import { buscarArticulo } from '../utils/inventario.js'

export default function DetalleArticulo() {
  const { id } = useParams()
  const { articulos, dispatch } = useInventario()
  const [mensaje, setMensaje] = useState('')
  const articulo = buscarArticulo(articulos, id)

  if (!articulo) {
    return (
      <section className="mx-auto w-full max-w-3xl px-4 py-10">
        <InventarioHeader
          eyebrow="Inventario"
          title="Artículo no encontrado"
          lead="El artículo que buscas no existe o fue eliminado del inventario."
        />
        <Link
          to="/inventario/lista"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40"
        >
          Volver a la lista
        </Link>
      </section>
    )
  }

  const sinStock = articulo.stock === 0

  function agregarAlCarrito() {
    if (sinStock) {
      return
    }

    dispatch({
      type: ACCIONES.AGREGAR_AL_CARRITO,
      payload: articulo.id,
    })
    setMensaje('Artículo agregado al carrito.')
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <InventarioHeader
        eyebrow="Detalle del artículo"
        title={articulo.nombre}
        lead={`${articulo.marca} · ${articulo.tipo}`}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-solid border-sf-border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <span
              className="grid h-20 w-20 place-items-center rounded-2xl bg-sf-soft text-4xl"
              aria-hidden="true"
            >
              📦
            </span>
            <div>
              <p className="mb-0 text-xs font-extrabold uppercase tracking-[0.16em] text-sf-green">
                {articulo.tipo}
              </p>
              <p className="mb-0 text-lg font-bold text-sf-text">{articulo.marca}</p>
            </div>
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-sf-cream p-4">
              <dt className="text-xs font-extrabold uppercase tracking-wide text-sf-muted">
                Marca
              </dt>
              <dd className="mt-1 mb-0 font-bold text-sf-text">{articulo.marca}</dd>
            </div>
            <div className="rounded-2xl bg-sf-cream p-4">
              <dt className="text-xs font-extrabold uppercase tracking-wide text-sf-muted">
                Tipo
              </dt>
              <dd className="mt-1 mb-0 font-bold text-sf-text">{articulo.tipo}</dd>
            </div>
            <div className="rounded-2xl bg-sf-cream p-4">
              <dt className="text-xs font-extrabold uppercase tracking-wide text-sf-muted">
                Stock disponible
              </dt>
              <dd className="mt-1 mb-0 font-bold text-sf-text">{articulo.stock}</dd>
            </div>
          </dl>
        </div>

        <aside className="rounded-3xl border border-solid border-sf-border bg-white p-6 shadow-sm">
          <p className="mb-0 text-xs font-extrabold uppercase tracking-wide text-sf-muted">
            Disponibilidad
          </p>
          <p className="mt-2 mb-0 text-4xl font-extrabold text-sf-green">
            {articulo.stock}
          </p>
          <p className="mt-1 mb-0 text-sm text-sf-muted">
            {sinStock ? 'Sin unidades disponibles.' : 'unidades disponibles'}
          </p>

          <button
            type="button"
            onClick={agregarAlCarrito}
            disabled={sinStock}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40 disabled:cursor-not-allowed disabled:bg-sf-border disabled:text-sf-muted"
          >
            {sinStock ? 'Sin stock' : 'Agregar al carrito'}
          </button>

          {mensaje && (
            <p
              role="status"
              className="mt-4 mb-0 rounded-xl bg-sf-soft px-3 py-2 text-xs font-semibold text-sf-green"
            >
              {mensaje}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/carrito"
              className="inline-flex items-center justify-center rounded-full border border-solid border-sf-border px-5 py-3 text-sm font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
            >
              Ver carrito
            </Link>
            <Link
              to="/inventario/lista"
              className="text-center text-sm font-bold text-sf-green underline decoration-sf-green/40 decoration-2 underline-offset-4"
            >
              Volver a la lista
            </Link>
          </div>
        </aside>
      </div>
    </section>
  )
}
