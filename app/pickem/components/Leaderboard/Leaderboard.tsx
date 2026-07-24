'use client'

import Image from 'next/image'

import { Skeleton } from '@heroui/react'

import { Column, GenericTable } from '@/components/ui/Table'
import { PickemLeaderboardEntry } from '@/types'

import styles from './Leaderboard.module.scss'

interface Props {
  entries: PickemLeaderboardEntry[]
  loading: boolean
}

export default function Leaderboard({ entries, loading }: Props) {
  const columns: Column<PickemLeaderboardEntry>[] = [
    {
      key: 'position',
      header: '#',
      render: (_: PickemLeaderboardEntry, index: number) => index + 1,
    },
    {
      key: 'player',
      header: 'Игрок',
      render: (item: PickemLeaderboardEntry) => (
        <div className={styles.player}>
          {item.avatar_url && (
            <Image
              src={item.avatar_url}
              alt={item.display_name || item.discord_username}
              width={24}
              height={24}
              className={styles.avatar}
              unoptimized
            />
          )}

          <span>{item.display_name || item.discord_username}</span>
        </div>
      ),
    },
    {
      key: 'points',
      header: 'Очки',
      className: styles.points,
      render: (item: PickemLeaderboardEntry) => item.total_points,
    },
    {
      key: 'correct',
      header: 'Верных',
      className: styles.right,
      render: (item: PickemLeaderboardEntry) =>
        `${item.correct_count}/${item.total_count}`,
    },
  ]

  if (loading) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Лидерборд</h3>

        <div className={styles.skeletonList}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className={styles.skeleton} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Лидерборд</h3>

      <GenericTable
        columns={columns}
        data={entries}
        keyExtractor={(item) => item.user_id}
        loading={loading}
        emptyText="Пока нет участников"
      />
    </div>
  )
}
