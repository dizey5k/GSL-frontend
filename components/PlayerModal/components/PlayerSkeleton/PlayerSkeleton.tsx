'use client'

import { Skeleton } from '@heroui/react'
import styles from '../../PlayerModal.module.scss'

export function PlayerSkeleton() {
  return (
    <>
      <div className={styles.skelHero}>
        <Skeleton className={styles.skelAv} />
        <div className={styles.skelHeroInfo}>
          <Skeleton className={styles.skelTitle} />
          <Skeleton className={styles.skelSub} />
        </div>
      </div>
      <div className={styles.skelDash}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className={styles.skelCard} />
        ))}
      </div>
    </>
  )
}
