import { Link } from 'react-router'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className="container">
        <p className={styles.notFoundCode}>404</p>
        <h1>Esta página se fue de compras</h1>
        <p className={styles.notFoundLead}>
          No encontramos la dirección que buscas. Puede que el enlace haya cambiado o que la página
          ya no exista.
        </p>
        <Link className="btn btn--primary" to="/">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}
