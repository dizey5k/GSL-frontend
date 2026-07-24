import type { PlayerStats } from '@/types'
import styles from '../../PlayerModal.module.scss'
import Image from 'next/image'

interface Props {
  player: PlayerStats
  rank: number | null
  nick: string
}

export function PlayerHeader({ player, rank, nick }: Props) {
  const name = player?.player_nickname || nick || '—'
  const elo = player?.rating != null ? Math.round(player.rating) : null
  const totalM = player?.total_matches ?? null
  const lastFam = player?.last_family
  const srv = player?.server_id || player?.primary_server || ''

  const subParts: string[] = []
  if (rank !== null) subParts.push(`#${rank} в рейтинге`)
  if (totalM !== null) subParts.push(`${totalM} матчей`)
  if (lastFam) subParts.push(lastFam)
  if (srv) subParts.push(srv)

  const avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2a2a2e&color=fff&size=144`

  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <Image
          className={styles.avatar}
          src={avatarSrc}
          alt={name}
          width={72}
          height={72}
        />
        <div className={styles.heroMeta}>
          {rank !== null && (
            <div className={styles.rankBadge}>#{rank} · рейтинг каптов</div>
          )}
          <div className={styles.eyebrow}>Профиль игрока</div>
          <div className={styles.heroName}>{name}</div>
          {subParts.length > 0 && (
            <div className={styles.subline}>
              {subParts.map((p, i) => (
                <span key={i}>
                  {i > 0 && <span className={styles.sublineDot} />}
                  <span>{p}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.heroRight}>
        {elo !== null && (
          <div className={styles.rating}>
            <div className={styles.ratingNum}>{elo}</div>
            <div className={styles.ratingLbl}>ELO · Влияние</div>
          </div>
        )}
      </div>
    </div>
  )
}
