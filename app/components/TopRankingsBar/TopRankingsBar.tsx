'use client'

import { useState } from 'react'
import { useUIStore } from '@/store'
import styles from './TopRankingsBar.module.scss'

interface Props {
  families: any[]
  players: any[]
}

export default function TopRankingsBar({ families, players }: Props) {
  const [activeTab, setActiveTab] = useState<'families' | 'players'>('families')
  const { openModal } = useUIStore()

  const data = activeTab === 'families' ? families : players

  const handleItemClick = (item: any) => {
    if (activeTab === 'families' && item.family_name) {
      openModal('family', { name: item.family_name })
    } else if (activeTab === 'players' && item.player_nickname) {
      openModal('player', { nick: item.player_nickname })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <span className={styles.label}>
          GSL — GTA HLTV и тир-лист Majestic RP
        </span>
        <div className={styles.tabGroup}>
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
        </div>
      </div>
      <div className={styles.track}>
        {data.slice(0, 10).map((item, index) => {
          const name = item.family_name || item.player_nickname || '—'
          const elo = item.rating != null ? Math.round(item.rating) : '—'
          return (
            <div
              key={item.id || item.player_nickname || index}
              className={styles.card}
              onClick={() => handleItemClick(item)}
            >
              <span className={styles.position}>#{index + 1}</span>
              <span className={styles.pts}>{elo}</span>
              <span className={styles.name}>{name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
