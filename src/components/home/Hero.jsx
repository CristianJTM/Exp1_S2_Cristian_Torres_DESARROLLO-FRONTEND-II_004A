import { Link } from 'react-router'
import StatList from '../ui/StatList.jsx'
import styles from './Hero.module.css'

export default function Hero({ content, stats }) {
  const { eyebrow, title, titleHighlight, lead, checks, primaryCta, secondaryCta, visual } =
    content

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroContent}>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="hero-title">
            {title} <span>{titleHighlight}</span>
          </h1>
          <p className={styles.heroLead}>{lead}</p>

          <div className={styles.heroActions}>
            <Link className="btn btn--primary" to={primaryCta.to}>
              {primaryCta.label}
            </Link>
            <Link className="btn btn--ghost" to={secondaryCta.to}>
              {secondaryCta.label}
            </Link>
          </div>

          <ul className={styles.heroChecks}>
            {checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
        </div>

        <div className={styles.heroVisual} aria-hidden="true">
          <span className={styles.heroEmoji}>{visual.emoji}</span>
          <span className={`${styles.heroTag} ${styles.heroTagTop}`}>{visual.tagTop}</span>
          <span className={`${styles.heroTag} ${styles.heroTagBottom}`}>{visual.tagBottom}</span>
        </div>
      </div>

      <div className="container">
        <StatList items={stats} />
      </div>
    </section>
  )
}
