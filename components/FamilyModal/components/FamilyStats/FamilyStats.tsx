'use client'

import { StatCard, StatGrid } from '@/components/ui/modal-common'
import { FamilyStats as FamilyStatsType } from '@/types'
import { fmt } from '../utils'
import styles from '../../FamilyModal.module.scss'

interface Props {
  family: FamilyStatsType
}

export function FamilyStats({ family }: Props) {
  const statsConfig = [
    {
      label: 'ELO',
      value: family?.rating != null ? fmt(family.rating) : null,
      variant: 'gold',
    },
    {
      label: 'Win Rate',
      value: family?.win_rate != null ? `${family.win_rate.toFixed(1)}%` : null,
      variant:
        family?.win_rate != null && family.win_rate >= 50 ? 'win' : 'lose',
    },
    {
      label: 'Матчей',
      value: family?.total_matches != null ? fmt(family.total_matches) : null,
    },
    {
      label: 'Побед',
      value: family?.wins != null ? fmt(family.wins) : null,
      variant: 'win',
    },
    {
      label: 'Поражений',
      value: family?.losses != null ? fmt(family.losses) : null,
      variant: 'lose',
    },
    {
      label: 'Ср. урон команды',
      value:
        family?.avg_team_damage != null ? fmt(family.avg_team_damage) : null,
    },
  ]

  return (
    <div className={styles.sec}>
      <div className={styles.secTitle}>Статистика</div>
      <StatGrid>
        {statsConfig.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value ?? '—'}
            variant={stat.variant as any}
          />
        ))}
      </StatGrid>
    </div>
  )
}
