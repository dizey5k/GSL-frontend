import { ReactNode } from 'react'
import styles from './StatCard.module.scss'

interface StatCardProps {
  label: string
  value: string | number
  variant?: 'gold' | 'win' | 'lose' | 'accent' | undefined
  badge?: string
  ctx?: string
  sub?: ReactNode
}

export function StatCard({
  label,
  value,
  variant,
  badge,
  ctx,
  sub,
}: StatCardProps) {
  const cls = [styles.card]
  if (variant)
    cls.push(
      styles[`card${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    )
  return (
    <div className={cls.join(' ')}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <div className={styles.lbl}>{label}</div>
      <div className={styles.val}>{value}</div>
      {ctx && <span className={styles.ctx}>{ctx}</span>}
      {sub && <div className={styles.sub}>{sub}</div>}
    </div>
  )
}

export function StatGrid({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`${styles.grid} ${className}`}>{children}</div>
}
