'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFiltersStore } from '@/store'
import { SERVERS } from '@/lib/constants'
import styles from './TierListToolbar.module.scss'

interface Props {
  type: 'players' | 'families'
}

export default function TierListToolbar({ type }: Props) {
  const router = useRouter()
  const { playerServer, setPlayerServer } = useFiltersStore()
  const [searchQuery, setSearchQuery] = useState('')

  const handleCompare = () => {
    router.push('/compare')
  }

  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrapper}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="16.65" y1="16.65" x2="21" y2="21" />
        </svg>
        <input
          className={styles.searchInput}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            type === 'players'
              ? 'Поиск игрока в топе по нику'
              : 'Поиск семьи в топе по названию'
          }
        />
      </div>

      <select
        className={styles.select}
        value={playerServer}
        onChange={(e) => setPlayerServer(e.target.value)}
      >
        <option value="">Все серверы</option>
        {SERVERS.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <button className={styles.compareBtn} onClick={handleCompare}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <path d="M16 3h5v5" />
          <path d="M4 20 21 3" />
          <path d="M21 16v5h-5" />
          <path d="M15 15l6 6" />
          <path d="M4 4l5 5" />
        </svg>
        Сравнить
      </button>
    </div>
  )
}
