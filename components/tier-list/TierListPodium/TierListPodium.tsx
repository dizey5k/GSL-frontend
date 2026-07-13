'use client'

import Image from 'next/image'
import { TierListItem } from '../types'
import styles from './TierListPodium.module.scss'

interface Props {
  items: TierListItem[]
  total: number
  onClick?: (item: TierListItem) => void
}

export default function TierListPodium({ items, total, onClick }: Props) {
  if (!items || items.length === 0) return null

  return (
    <div className={styles.summary}>
      <div className={styles.podium}>
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.podiumItem}
            onClick={() => onClick?.(item)}
          >
            <Image
              src={item.avatar}
              alt={item.name}
              width={44}
              height={44}
              className={styles.podiumAvatar}
              unoptimized
            />
            <span className={styles.rank}>#{item.rank}</span>
            <span className={styles.name}>{item.name}</span>
          </div>
        ))}
      </div>
      <div className={styles.stats}>
        <span>
          <b>{total}</b> в топе
        </span>
      </div>
    </div>
  )
}
