'use client'

import Image from 'next/image'
import { TierListItem } from '../types'
import styles from './TierListRow.module.scss'

interface Props {
  item: TierListItem
  onClick?: (item: TierListItem) => void
}

export default function TierListRow({ item, onClick }: Props) {
  const handleClick = () => onClick?.(item)

  return (
    <div className={styles.row} onClick={handleClick}>
      <div className={styles.rank}>#{item.rank}</div>
      <Image
        src={item.avatar}
        alt={item.name}
        width={40}
        height={40}
        className={styles.avatar}
        unoptimized
      />
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.meta}>
          {item.stats.server && (
            <span className={styles.serverTag}>{item.stats.server}</span>
          )}
          <span className={styles.matchesTag}>{item.stats.matches} матч.</span>
          {item.stats.winRate != null && (
            <span className={styles.winRateTag}>
              {item.stats.winRate.toFixed(1)}% WR
            </span>
          )}
          {item.stats.memberCount != null && (
            <span className={styles.membersTag}>
              {item.stats.memberCount} участников
            </span>
          )}
        </div>
      </div>
      <div className={styles.elo}>
        <div className={styles.eloValue}>{item.stats.elo ?? '—'}</div>
        <div className={styles.eloLabel}>ELO</div>
      </div>
    </div>
  )
}
