import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import TablaInventario from '../components/inventario/TablaInventario.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import { TIPOS_ARTICULO } from '../data/inventario.js'
import { filtrarArticulos } from '../utils/inventario.js'

const CATEGORIAS = ['Todas', ...TIPOS_ARTICULO]

export default function ListaInventario() {
  const { articulos, dispatch } = useInventario()
  const [categoria, setCategoria] = useState('Todas')
  const articulosFiltrados = useMemo(
    () => filtrarArticulos(articulos, categoria),
    [articulos, categoria],
  )

  function handleEliminar(id) {
    dispatch({
      type: ACCIONES.ELIMINAR,
      payload: id,
    })
  }

  const total = articulos.length
  const mostrados = articulosFiltrados.length
  const sinArticulos = total === 0
  const sinResultados = !sinArticulos && mostrados === 0

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <InventarioHeader
          eyebrow="Inventario"
          title="Lista de inventario"
          lead="Filtra por categoría, revisa el stock y administra los artículos disponibles."
        />
        <Link
          to="/inventario/agregar"
          className="inline-flex items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40"
        >
          Agregar artículo
        </Link>
      </div>

      <div className="mt-6 flex flex-col gap-4 rounded-3xl border border-solid border-sf-border bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <label htmlFor="filtro-categoria" className="text-sm font-semibold text-sf-text">
            Filtrar por categoría
          </label>
          <select
            id="filtro-categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            className="mt-1 w-full rounded-xl border border-solid border-sf-border bg-white px-3 py-2.5 text-sm text-sf-text shadow-sm outline-none transition focus:border-sf-green focus:ring-2 focus:ring-sf-green/20"
          >
            {CATEGORIAS.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <p className="mb-0 text-sm font-semibold text-sf-muted" aria-live="polite">
          Mostrando {mostrados} de {total} artículos
        </p>
      </div>

      {sinArticulos && (
        <div className="mt-4 rounded-3xl border border-dashed border-sf-border bg-white p-10 text-center">
          <p className="mb-0 text-lg font-bold text-sf-text">Aún no hay artículos</p>
          <p className="mt-2 mb-0 text-sm text-sf-muted">
            Agrega el primer artículo para comenzar a llenar tu inventario.
          </p>
          <Link
            to="/inventario/agregar"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40"
          >
            Agregar artículo
          </Link>
        </div>
      )}

      {sinResultados && (
        <div className="mt-4 rounded-3xl border border-dashed border-sf-border bg-white p-10 text-center">
          <p className="mb-0 text-lg font-bold text-sf-text">
            No hay artículos en {categoria}
          </p>
          <p className="mt-2 mb-0 text-sm text-sf-muted">
            Cambia la categoría o vuelve a ver todo el inventario.
          </p>
          <button
            type="button"
            onClick={() => setCategoria('Todas')}
            className="mt-5 inline-flex items-center justify-center rounded-full border border-solid border-sf-border px-5 py-3 text-sm font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
          >
            Ver todas las categorías
          </button>
        </div>
      )}

      {!sinArticulos && !sinResultados && (
        <div className="mt-4">
          <TablaInventario articulos={articulosFiltrados} onEliminar={handleEliminar} />
        </div>
      )}
    </section>
  )
}
