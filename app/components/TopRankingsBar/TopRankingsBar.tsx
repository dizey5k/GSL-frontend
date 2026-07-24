'use client'

import { useState } from 'react'
import { useUIStore } from '@/store'
import { Skeleton, Card } from '@heroui/react'
import styles from './TopRankingsBar.module.scss'

interface Props {
  families: any[]
  players: any[]
  loading?: boolean
}

export default function TopRankingsBar({
  families,
  players,
  loading = false,
}: Props) {
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

  if (loading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.tabs}>
          <span className={styles.label}>GSL — GTA HLTV</span>
          <div className={styles.tabGroup}>
            <div className={styles.tab}>Семьи</div>
            <div className={styles.tab}>Игроки</div>
          </div>
        </div>
        <div className={styles.track}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Card key={i} className={styles.skeletonCard}>
              <Skeleton className={styles.skeletonTopCard} />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <span className={styles.label}>GSL — GTA HLTV</span>
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
          const rank = index + 1
          return (
            <div
              key={item.id || item.player_nickname || index}
              className={`${styles.card} ${styles[`rank-${rank}`] || ''}`}
              onClick={() => handleItemClick(item)}
            >
              <span className={styles.rankNum}>#{rank}</span>
              <div className={styles.eloWrap}>
                <span className={styles.eloValue}>{elo}</span>
              </div>
              <span className={styles.cardName}>{name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
