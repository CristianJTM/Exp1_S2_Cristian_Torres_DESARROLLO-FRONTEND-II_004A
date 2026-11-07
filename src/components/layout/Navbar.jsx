import { NavLink } from 'react-router'
import { useInventario } from '../../context/InventarioContext.jsx'
import { NAV_ITEMS } from '../../data/navegacion.js'
import { contarUnidadesCarrito } from '../../utils/inventario.js'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { carrito } = useInventario()
  const totalCarrito = contarUnidadesCarrito(carrito)

  return (
    <nav className={styles.navbar} aria-label="Navegación principal">
      <div className={styles.navbarInner}>
        {NAV_ITEMS.map(({ to, label, icon, ariaLabel }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={
              to === '/carrito'
                ? `Carrito de compras, ${totalCarrito} ${
                    totalCarrito === 1 ? 'unidad' : 'unidades'
                  }`
                : ariaLabel
            }
            className={({ isActive }) =>
              `${styles.navLink}${isActive ? ` ${styles.active}` : ''}`
            }
          >
            <span className={styles.navIcon} aria-hidden="true">
              {icon}
            </span>
            <span className={styles.navLabel}>{label}</span>
            {to === '/carrito' && totalCarrito > 0 && (
              <span className={styles.navBadge} aria-hidden="true">
                {totalCarrito}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
