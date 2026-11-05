import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import InventarioHeader from '../components/inventario/InventarioHeader.jsx'
import { ACCIONES, useInventario } from '../context/InventarioContext.jsx'
import { TIPOS_ARTICULO } from '../data/inventario.js'

const FORM_INICIAL = {
  nombre: '',
  marca: '',
  tipo: TIPOS_ARTICULO[0],
}

function crearId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function AgregarArticulo() {
  const [form, setForm] = useState(FORM_INICIAL)
  const [errores, setErrores] = useState({})
  const nombreRef = useRef(null)
  const marcaRef = useRef(null)
  const { dispatch } = useInventario()
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target

    setForm((anterior) => ({ ...anterior, [name]: value }))
    setErrores((anteriores) => {
      const siguientes = { ...anteriores }
      delete siguientes[name]
      return siguientes
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const nombre = form.nombre.trim()
    const marca = form.marca.trim()
    const nuevosErrores = {}

    if (nombre.length < 2) {
      nuevosErrores.nombre = 'Ingresa un nombre de al menos 2 caracteres.'
    }

    if (marca.length < 2) {
      nuevosErrores.marca = 'Ingresa una marca de al menos 2 caracteres.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)

      if (nuevosErrores.nombre) {
        nombreRef.current?.focus()
      } else if (nuevosErrores.marca) {
        marcaRef.current?.focus()
      }

      return
    }

    dispatch({
      type: ACCIONES.AGREGAR,
      payload: {
        id: crearId(),
        nombre,
        marca,
        tipo: form.tipo,
      },
    })

    setForm(FORM_INICIAL)
    setErrores({})
    navigate('/inventario/lista')
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10">
      <InventarioHeader
        eyebrow="Inventario"
        title="Agregar artículo"
        lead="Registra un nuevo producto con su nombre, marca y tipo para incorporarlo al inventario del supermercado."
      />

      <div className="mt-8 rounded-3xl border border-solid border-sf-border bg-white p-6 shadow-sm sm:p-8">
        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="nombre" className="text-sm font-semibold text-sf-text">
              Nombre <span className="text-sf-error">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              ref={nombreRef}
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Leche entera"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={errores.nombre ? 'true' : undefined}
              aria-describedby={errores.nombre ? 'error-nombre' : undefined}
              className="mt-1 w-full rounded-xl border border-solid border-sf-border bg-white px-3 py-2.5 text-sm text-sf-text shadow-sm outline-none transition focus:border-sf-green focus:ring-2 focus:ring-sf-green/20"
            />
            {errores.nombre && (
              <p id="error-nombre" role="alert" className="mt-1 mb-0 text-xs font-semibold text-sf-error">
                {errores.nombre}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="marca" className="text-sm font-semibold text-sf-text">
              Marca <span className="text-sf-error">*</span>
            </label>
            <input
              id="marca"
              name="marca"
              type="text"
              ref={marcaRef}
              value={form.marca}
              onChange={handleChange}
              placeholder="Ej: Colún"
              autoComplete="off"
              required
              aria-required="true"
              aria-invalid={errores.marca ? 'true' : undefined}
              aria-describedby={errores.marca ? 'error-marca' : undefined}
              className="mt-1 w-full rounded-xl border border-solid border-sf-border bg-white px-3 py-2.5 text-sm text-sf-text shadow-sm outline-none transition focus:border-sf-green focus:ring-2 focus:ring-sf-green/20"
            />
            {errores.marca && (
              <p id="error-marca" role="alert" className="mt-1 mb-0 text-xs font-semibold text-sf-error">
                {errores.marca}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="tipo" className="text-sm font-semibold text-sf-text">
              Tipo <span className="text-sf-error">*</span>
            </label>
            <select
              id="tipo"
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              required
              aria-required="true"
              className="mt-1 w-full rounded-xl border border-solid border-sf-border bg-white px-3 py-2.5 text-sm text-sf-text shadow-sm outline-none transition focus:border-sf-green focus:ring-2 focus:ring-sf-green/20"
            >
              {TIPOS_ARTICULO.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-sf-green px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-sf-dark focus:outline-none focus:ring-2 focus:ring-sf-green/40"
            >
              Guardar artículo
            </button>
            <Link
              to="/inventario/lista"
              className="inline-flex items-center justify-center rounded-full border border-solid border-sf-border px-5 py-3 text-sm font-bold text-sf-text transition hover:bg-sf-sand focus:outline-none focus:ring-2 focus:ring-sf-green/30"
            >
              Ver inventario
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
