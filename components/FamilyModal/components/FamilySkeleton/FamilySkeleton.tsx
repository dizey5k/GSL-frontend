'use client'

import { Skeleton } from '@heroui/react'
import styles from '../../FamilyModal.module.scss'

export function FamilySkeleton() {
  return (
    <>
      <div className={styles.skelCover}>
        <div className={styles.skelCoverInner}>
          <Skeleton className={styles.skelLogo} />
          <div className={styles.skelCoverInfo}>
            <Skeleton className={styles.skelTitle} />
            <Skeleton className={styles.skelSub} />
          </div>
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
