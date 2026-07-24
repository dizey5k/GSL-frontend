'use client'

import { PickemScore } from '@/types'
import { Skeleton } from '@heroui/react'
import styles from './MyStats.module.scss'

interface Props {
  stats: PickemScore | null | undefined
  loading: boolean
}

export default function MyStats({ stats, loading }: Props) {
  if (loading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Моя статистика</h3>
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Моя статистика</h3>
        <p className={styles.empty}>Войдите, чтобы увидеть свою статистику</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Моя статистика</h3>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <div className={styles.statValue}>{stats.total_points}</div>
          <div className={styles.statLabel}>Очков</div>
        </div>
        <div className={styles.statItem}>
          <div className={styles.statValue}>
            {stats.correct_count}/{stats.total_count}
          </div>
          <div className={styles.statLabel}>Верных</div>
        </div>
      </div>
    </div>
  )
}
