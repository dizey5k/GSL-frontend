'use client'

import { useCompareStore } from '@/store/compareStore'
import styles from './CompareTabs.module.scss'

const TABS = [
  { id: 'players' as const, label: 'Игроки' },
  { id: 'families' as const, label: 'Семьи' },
  { id: 'gangame' as const, label: 'Гангейм' },
]

export default function CompareTabs() {
  const { mode, setMode } = useCompareStore()

  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tab} ${mode === tab.id ? styles.active : ''}`}
          onClick={() => setMode(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
