'use client'

import { useUIStore } from '@/store'
import { usePlayer } from '@/hooks'
import styles from './PlayerModal.module.scss'

export function PlayerModal() {
  const { modals, closeModal } = useUIStore()
  const { open, data } = modals.player
  const nick = data?.nick
  const server = data?.server

  const { data: player, isLoading } = usePlayer(nick, server)

  if (!open) return null

  const handleClose = () => closeModal('player')

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={handleClose}>
          ×
        </button>
        {isLoading && <div className={styles.loading}>Загрузка...</div>}
        {!isLoading && player && (
          <div>
            <h2>{player.player_nickname}</h2>
            <p>
              ELO: {player.rating != null ? Math.round(player.rating) : '—'}
            </p>
            <p>
              Винрейт:{' '}
              {player.win_rate != null
                ? Number(player.win_rate).toFixed(1) + '%'
                : '—'}
            </p>
            <p>Матчей: {player.total_matches ?? '—'}</p>
            {player.last_family && <p>Семья: {player.last_family}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
