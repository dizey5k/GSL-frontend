'use client'

import type { PlayerStats } from '@/types'
import { SocialBtn } from '../SocialBtn/SocialBtn'
import { SOCIAL_CONFIG } from './socialConfig'
import styles from '../../PlayerModal.module.scss'

interface Props {
  player: PlayerStats
  nick: string
}

export function PlayerActions({ player, nick }: Props) {
  const lastFam = player?.last_family

  return (
    <div className={styles.actions}>
      <div className={styles.actionsGroup}>
        <a
          className={styles.actionBtn}
          href={`/compare?p1=${encodeURIComponent(nick)}`}
        >
          Сравнить
        </a>
        {lastFam && (
          <a
            className={styles.actionBtn}
            href={`/family/${encodeURIComponent(lastFam)}`}
          >
            {lastFam}
          </a>
        )}
      </div>
      <div className={styles.socials}>
        {SOCIAL_CONFIG.map((item) => (
          <SocialBtn
            key={item.title}
            icon={item.icon}
            title={item.title}
            href={item.href}
            disabled={item.disabled}
          />
        ))}
      </div>
    </div>
  )
}
