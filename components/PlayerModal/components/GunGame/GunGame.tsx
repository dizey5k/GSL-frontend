'use client'

import { useState } from 'react'
import { Spinner } from '@heroui/react'
import styles from '../../PlayerModal.module.scss'

interface Props {
  nick: string
  server?: string
}

export function GunGame({ nick, server }: Props) {
  const [error] = useState<string | null>(null)

  if (error) return <div className={styles.emptyState}>{error}</div>

  return (
    <div className={styles.paneContent}>
      <div className={styles.matchesPanel}>
        <div className={styles.loadingState}>
          <Spinner size="sm" color="warning" />
          <div>Загрузка гангейма...</div>
        </div>
      </div>
    </div>
  )
}
