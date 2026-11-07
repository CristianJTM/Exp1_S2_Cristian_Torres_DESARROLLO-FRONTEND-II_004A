export default function TablaInventario({ articulos, onEliminar }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-solid border-sf-border bg-white shadow-sm">
      <table className="min-w-[680px] w-full text-left text-sm">
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
              <td className="px-4 py-3 font-semibold text-sf-text">{articulo.nombre}</td>
              <td className="px-4 py-3 text-sf-muted">{articulo.marca}</td>
              <td className="px-4 py-3 text-sf-muted">{articulo.tipo}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    articulo.stock > 0
                      ? 'font-bold text-sf-green'
                      : 'font-bold text-sf-error'
                  }
                >
                  {articulo.stock > 0 ? articulo.stock : 'Sin stock'}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEliminar(articulo.id)}
                  aria-label={`Eliminar ${articulo.nombre}`}
                  className="rounded-full border border-solid border-sf-border px-3 py-1.5 text-xs font-bold text-sf-error transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
