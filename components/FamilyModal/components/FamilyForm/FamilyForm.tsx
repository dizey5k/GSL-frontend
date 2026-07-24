'use client'

import { FamilyMatch } from '@/types'
import styles from '../../FamilyModal.module.scss'

interface Props {
  matches: FamilyMatch[]
  familyName: string
}

export function FamilyForm({ matches, familyName }: Props) {
  const recent = matches.slice(0, 10)
  let streak = 0,
    streakW: boolean | null = null
  recent.forEach((m: any) => {
    const w = m.winner === familyName || m.result === 'win'
    if (streakW === w) streak++
    else {
      streakW = w
      streak = 1
    }
  })

  if (!recent.length) return null

  return (
    <div className={styles.sec}>
      <div className={styles.formHead}>
        <div className={styles.secTitle} style={{ margin: 0 }}>
          Форма
        </div>
        {streakW !== null && (
          <div className={styles.formStreak}>
            {streakW ? 'Побед' : 'Поражений'} подряд: <b>{streak}</b>
          </div>
        )}
      </div>
      <div className={styles.formDots}>
        {recent.map((m: any, i: number) => {
          const w = m.winner === familyName || m.result === 'win'
          return (
            <div
              key={i}
              className={`${styles.fxDot} ${w ? styles.fxDotW : styles.fxDotL}`}
            >
              {w ? 'W' : 'L'}
            </div>
          )
        })}
        {Array.from({ length: Math.max(0, 10 - recent.length) }).map((_, i) => (
          <div key={`n-${i}`} className={`${styles.fxDot} ${styles.fxDotN}`}>
            —
          </div>
        ))}
      </div>
    </div>
  )
}
