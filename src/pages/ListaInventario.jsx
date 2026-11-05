import { Link } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import TablaInventario from '../components/inventario/TablaInventario.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'

export default function ListaInventario() {
  const { articulos, dispatch } = useInventario()

  function handleEliminar(id) {
    dispatch({
      type: ACCIONES.ELIMINAR,
      payload: id,
    })
  }

  const cantidad = articulos.length

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <InventarioHeader
          eyebrow="Inventario"
          title="Lista de inventario"
          lead="Revisa los artículos registrados y elimina los que ya no necesites."
        />
        <Link
          to="/inventario/agregar"
          className="inline-flex items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40"
        >
          Agregar artículo
        </Link>
      </div>

      <p className="mt-6 mb-0 text-sm font-semibold text-sf-muted" aria-live="polite">
        {cantidad} {cantidad === 1 ? 'artículo registrado' : 'artículos registrados'}
      </p>

      {cantidad === 0 ? (
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
      ) : (
        <div className="mt-4">
          <TablaInventario articulos={articulos} onEliminar={handleEliminar} />
        </div>
      )}
    </section>
  )
}
