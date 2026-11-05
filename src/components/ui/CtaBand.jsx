import { Link } from 'react-router'
import styles from './CtaBand.module.css'

export default function CtaBand({ title, text, primary, secondary }) {
  return (
    <div className={styles.ctaBand}>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className={styles.ctaBandActions}>
        <Link className="btn btn--light" to={primary.to}>
          {primary.label}
        </Link>
        {secondary && (
          <Link className="btn btn--outline-light" to={secondary.to}>
            {secondary.label}
          </Link>
        )}
      </div>
    </div>
  )
}
