'use client'

import { StatCard, StatGrid } from '@/components/ui/modal-common'
import styles from '../../PlayerModal.module.scss'
import type { PlayerMatch, PlayerStats } from '@/types'
import { buildStatConfig } from './startConfig'

interface Props {
  player: PlayerStats
  matches: PlayerMatch[]
  nick: string
}

export function PlayerStats({ player, matches, nick }: Props) {
  const stats = buildStatConfig(player, matches, nick)

  return (
    <div className={styles.dashboard}>
      <div className={styles.sectionLabel}>Статистика</div>
      <StatGrid>
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            variant={stat.variant}
            badge={stat.badge}
            sub={stat.sub}
            ctx={stat.ctx}
          />
        ))}
      </StatGrid>
    </div>
  )
}
