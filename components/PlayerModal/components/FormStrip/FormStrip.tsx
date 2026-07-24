'use client'

import { PlayerMatch } from '@/types'
import styles from '../../PlayerModal.module.scss'

interface Props {
  matches: PlayerMatch[]
  nick: string
}

export function FormStrip({ matches, nick }: Props) {
  if (!matches.length) {
    return <span className={styles.formEmpty}>Нет матчей</span>
  }
  return (
    <div className={styles.formDots}>
      {matches.slice(0, 20).map((m, i) => {
        const isWin = m.winner === nick
        return (
          <div
            key={i}
            className={`${styles.formDot} ${isWin ? styles.dotWin : styles.dotLose}`}
          />
        )
      })}
    </div>
  )
}
