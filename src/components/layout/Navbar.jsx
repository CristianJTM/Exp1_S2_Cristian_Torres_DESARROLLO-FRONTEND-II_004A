import { NavLink } from 'react-router'
import { NAV_ITEMS } from '../../data/navegacion.js'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="Navegación principal">
      <div className={styles.navbarInner}>
        {NAV_ITEMS.map(({ to, label, icon, ariaLabel }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            aria-label={ariaLabel}
            className={({ isActive }) =>
              `${styles.navLink}${isActive ? ` ${styles.active}` : ''}`
            }
          >
            <span className={styles.navIcon} aria-hidden="true">
              {icon}
            </span>
            <span className={styles.navLabel}>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
