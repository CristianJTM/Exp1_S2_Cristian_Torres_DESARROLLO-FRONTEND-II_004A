import { Link } from 'react-router'

function StockBadge({ stock }) {
  return (
    <span
      className={
        stock > 0 ? 'font-bold text-sf-green' : 'font-bold text-sf-error'
      }
    >
      {stock > 0 ? `${stock} disponibles` : 'Sin stock'}
    </span>
  )
}

export default function TablaInventario({ articulos, onEliminar }) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {articulos.map((articulo) => (
          <article
            key={articulo.id}
            className="rounded-2xl border border-solid border-sf-border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  to={`/inventario/detalle/${articulo.id}`}
                  className="font-bold text-sf-text underline decoration-sf-green/40 decoration-2 underline-offset-4 transition hover:text-sf-green"
                >
                  {articulo.nombre}
                </Link>
                <p className="mt-1 mb-0 text-sm text-sf-muted">
                  {articulo.marca} · {articulo.tipo}
                </p>
              </div>
              <StockBadge stock={articulo.stock} />
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/inventario/detalle/${articulo.id}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-solid border-sf-border px-3 py-2 text-xs font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
              >
                Ver detalle
              </Link>
              <button
                type="button"
                onClick={() => onEliminar(articulo.id)}
                aria-label={`Eliminar ${articulo.nombre}`}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-solid border-sf-border px-3 py-2 text-xs font-bold text-sf-error transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
              >
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-3xl border border-solid border-sf-border bg-white shadow-sm md:block">
        <table className="min-w-[760px] w-full text-left text-sm">
          <caption className="sr-only">Listado de artículos del inventario</caption>
          <thead className="bg-sf-sand text-xs font-extrabold uppercase tracking-wide text-sf-muted">
            <tr>
              <th scope="col" className="px-4 py-3">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3">
                Marca
              </th>
              <th scope="col" className="px-4 py-3">
                Tipo
              </th>
              <th scope="col" className="px-4 py-3">
                Stock
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {articulos.map((articulo) => (
              <tr key={articulo.id} className="border-t border-solid border-sf-border">
                <td className="px-4 py-3 font-semibold">
                  <Link
                    to={`/inventario/detalle/${articulo.id}`}
                    className="text-sf-text underline decoration-sf-green/40 decoration-2 underline-offset-4 transition hover:text-sf-green"
                  >
                    {articulo.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sf-muted">{articulo.marca}</td>
                <td className="px-4 py-3 text-sf-muted">{articulo.tipo}</td>
                <td className="px-4 py-3">
                  <StockBadge stock={articulo.stock} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/inventario/detalle/${articulo.id}`}
                      className="rounded-full border border-solid border-sf-border px-3 py-1.5 text-xs font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
                    >
                      Ver
                    </Link>
                    <button
                      type="button"
                      onClick={() => onEliminar(articulo.id)}
                      aria-label={`Eliminar ${articulo.nombre}`}
                      className="rounded-full border border-solid border-sf-border px-3 py-1.5 text-xs font-bold text-sf-error transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
