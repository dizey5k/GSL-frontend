'use client'

import { useState } from 'react'
import { useUIStore } from '@/store'
import styles from './SidebarWidget.module.scss'

interface Props {
  families: any[]
  players: any[]
}

export default function SidebarWidget({ families, players }: Props) {
  const [activeTab, setActiveTab] = useState<'families' | 'players'>('families')
  const [searchQuery, setSearchQuery] = useState('')
  const { openModal } = useUIStore()

  const data = activeTab === 'families' ? families : players

  const filteredData = data.filter((item) => {
    const name = item.family_name || item.player_nickname || ''
    return name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const handleRowClick = (item: any) => {
    if (activeTab === 'families' && item.family_name) {
      openModal('family', { name: item.family_name })
    } else if (activeTab === 'players' && item.player_nickname) {
      openModal('player', { nick: item.player_nickname })
    }
  }

  return (
    <div className={styles.widget}>
      <div className={styles.head}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'families' ? styles.active : ''}`}
            onClick={() => setActiveTab('families')}
          >
            Семьи
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'players' ? styles.active : ''}`}
            onClick={() => setActiveTab('players')}
          >
            Игроки
          </button>
          <button className={styles.tab} disabled title="Скоро">
            Трансфер
          </button>
        </div>
      </div>

      <div className={styles.search}>
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
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск игрока по нику"
        />
      </div>

      <div className={styles.list}>
        {filteredData.slice(0, 10).map((item, index) => {
          const name = item.family_name || item.player_nickname || '—'
          const elo = item.rating != null ? Math.round(item.rating) : '—'
          return (
            <div
              key={item.id || item.player_nickname || index}
              className={styles.row}
              onClick={() => handleRowClick(item)}
            >
              <span className={styles.rank}>#{index + 1}</span>
              <span className={styles.name}>{name}</span>
              <span className={styles.elo}>{elo}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.footer}>
        <a
          href={
            activeTab === 'families' ? '/tier-list-semey' : '/tier-list-igroki'
          }
        >
          Смотреть рейтинг {activeTab === 'families' ? 'семей' : 'игроков'}
        </a>
      </div>
    </div>
  )
}
