'use client'

import { useUIStore } from '@/store'
import styles from './TierListHeader.module.scss'

interface Props {
  title: string
  description: string
  type: 'players' | 'families'
}

export default function TierListHeader({ title, description, type }: Props) {
  const { openModal } = useUIStore()

  const handleRulesClick = () => {
    openModal('rules', { type })
  }

  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{description}</p>
      </div>
      <button className={styles.rulesBtn} onClick={handleRulesClick}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        Как считается рейтинг
      </button>
    </div>
  )
}
