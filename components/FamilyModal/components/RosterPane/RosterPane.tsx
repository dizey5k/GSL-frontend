'use client'

import { useState } from 'react'
import { Spinner } from '@heroui/react'
import styles from '../../FamilyModal.module.scss'

const ROSTER_SORTS = [
  { key: 'avg_damage', label: 'Топ урон' },
  { key: 'total_damage', label: 'Общий урон' },
  { key: 'total_kills', label: 'Киллы' },
  { key: 'matches', label: 'Капты' },
]

export function RosterPane() {
  const [sort, setSort] = useState('avg_damage')

  return (
    <>
      <div className={styles.filters}>
        {ROSTER_SORTS.map((s) => (
          <button
            key={s.key}
            className={`${styles.filter} ${sort === s.key ? styles.filterActive : ''}`}
            onClick={() => setSort(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className={styles.emptyState}>
        <Spinner size="sm" color="warning" />
        <div style={{ marginTop: 8 }}>Загрузка состава...</div>
      </div>
    </>
  )
}
