import { Link } from 'react-router'

function ControlesCantidad({ item, onIncrementar, onDecrementar }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onDecrementar(item.articuloId)}
        aria-label={`Disminuir cantidad de ${item.articulo.nombre}`}
        className="grid h-8 w-8 place-items-center rounded-full border border-solid border-sf-border text-base font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
      >
        −
      </button>
      <span className="min-w-6 text-center font-bold text-sf-text">{item.cantidad}</span>
      <button
        type="button"
        onClick={() => onIncrementar(item.articuloId)}
        disabled={item.articulo.stock === 0}
        aria-label={`Aumentar cantidad de ${item.articulo.nombre}`}
        className="grid h-8 w-8 place-items-center rounded-full border border-solid border-sf-border text-base font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}

function StockCarrito({ stock }) {
  return (
    <span
      className={
        stock > 0 ? 'font-bold text-sf-green' : 'font-bold text-sf-error'
      }
    >
      {stock > 0 ? stock : 'Sin stock'}
    </span>
  )
}

export default function TablaCarrito({
  items,
  onIncrementar,
  onDecrementar,
  onEliminar,
}) {
  return (
    <>
      <div className="space-y-3 md:hidden">
        {items.map((item) => (
          <article
            key={item.articuloId}
            className="rounded-2xl border border-solid border-sf-border bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <Link
                  to={`/inventario/detalle/${item.articulo.id}`}
                  className="font-bold text-sf-text underline decoration-sf-green/40 decoration-2 underline-offset-4 transition hover:text-sf-green"
                >
                  {item.articulo.nombre}
                </Link>
                <p className="mt-1 mb-0 text-sm text-sf-muted">
                  {item.articulo.marca} · {item.articulo.tipo}
                </p>
              </div>
              <StockCarrito stock={item.articulo.stock} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <ControlesCantidad
                item={item}
                onIncrementar={onIncrementar}
                onDecrementar={onDecrementar}
              />
              <button
                type="button"
                onClick={() => onEliminar(item.articuloId)}
                aria-label={`Quitar ${item.articulo.nombre} del carrito`}
                className="rounded-full border border-solid border-sf-border px-3 py-1.5 text-xs font-bold text-sf-error transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
              >
                Quitar
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-3xl border border-solid border-sf-border bg-white shadow-sm md:block">
        <table className="min-w-[760px] w-full text-left text-sm">
          <caption className="sr-only">Artículos agregados al carrito</caption>
          <thead className="bg-sf-sand text-xs font-extrabold uppercase tracking-wide text-sf-muted">
            <tr>
              <th scope="col" className="px-4 py-3">
                Producto
              </th>
              <th scope="col" className="px-4 py-3">
                Marca
              </th>
              <th scope="col" className="px-4 py-3">
                Tipo
              </th>
              <th scope="col" className="px-4 py-3 text-center">
                Cantidad
              </th>
              <th scope="col" className="px-4 py-3">
                Stock restante
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.articuloId} className="border-t border-solid border-sf-border">
                <td className="px-4 py-3 font-semibold">
                  <Link
                    to={`/inventario/detalle/${item.articulo.id}`}
                    className="text-sf-text underline decoration-sf-green/40 decoration-2 underline-offset-4 transition hover:text-sf-green"
                  >
                    {item.articulo.nombre}
                  </Link>
                </td>
                <td className="px-4 py-3 text-sf-muted">{item.articulo.marca}</td>
                <td className="px-4 py-3 text-sf-muted">{item.articulo.tipo}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <ControlesCantidad
                      item={item}
                      onIncrementar={onIncrementar}
                      onDecrementar={onDecrementar}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StockCarrito stock={item.articulo.stock} />
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onEliminar(item.articuloId)}
                    aria-label={`Quitar ${item.articulo.nombre} del carrito`}
                    className="rounded-full border border-solid border-sf-border px-3 py-1.5 text-xs font-bold text-sf-error transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
                  >
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
