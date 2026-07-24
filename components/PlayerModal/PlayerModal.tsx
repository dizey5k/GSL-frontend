'use client'

import { useUIStore } from '@/store'
import { usePlayer, usePlayerHistory, usePlayerRank } from '@/hooks'
import { ModalShell, ModalBody } from '@/components/ui/modal-common'
import styles from './PlayerModal.module.scss'
import {
  PlayerActions,
  PlayerHeader,
  PlayerSkeleton,
  PlayerStats,
  PlayerTabs,
} from './components'

export function PlayerModal() {
  const { modals, closeModal } = useUIStore()
  const { open, data } = modals.player
  const nick = data?.nick
  const server = data?.server

  const { data: player, isLoading } = usePlayer(nick, server)
  const { data: rankRes } = usePlayerRank(nick)
  const { data: historyRes } = usePlayerHistory(nick, {
    period: '1y',
    limit: 20,
    server,
  })

  if (!open) return null

  const handleClose = () => closeModal('player')
  const rank = rankRes?.rank ?? player?.rank ?? null
  const matches = (historyRes as any)?.matches || []

  return (
    <ModalShell onClose={handleClose}>
      <ModalBody>
        {isLoading ? (
          <PlayerSkeleton />
        ) : player ? (
          <>
            <PlayerHeader player={player} rank={rank} nick={nick} />
            <PlayerActions player={player} nick={nick} />
            <PlayerStats player={player} matches={matches} nick={nick} />
            <PlayerTabs
              nick={nick}
              server={server}
              matches={matches}
              player={player}
            />
            <a
              className={styles.linkFoot}
              href={`/player/${encodeURIComponent(nick)}${server ? `?server=${server}` : ''}`}
            >
              Полный профиль →
            </a>
          </>
        ) : (
          <div className={styles.emptyState}>Игрок не найден</div>
        )}
      </ModalBody>
    </ModalShell>
  )
}
