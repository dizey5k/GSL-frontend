import { PlayerMatch, PlayerStats } from '@/types'
import { FormStrip } from '../FormStrip'

export interface StatItem {
  id: string
  label: string
  value: string | number
  variant?: 'gold' | 'win' | 'lose' | 'accent'
  badge?: string
  sub?: string | React.ReactNode
  ctx?: string
}

export function buildStatConfig(
  player: PlayerStats,
  matches: PlayerMatch[],
  nick: string,
): StatItem[] {
  const elo = player?.rating != null ? Math.round(player.rating) : null
  const dmg = player?.avg_damage != null ? Math.round(player.avg_damage) : null
  const maxDmg =
    player?.max_damage != null ? Math.round(player.max_damage) : null
  const kills =
    player?.avg_kills != null ? Number(player.avg_kills).toFixed(1) : null
  const maxKills = player?.max_kills ?? null
  const wr = player?.win_rate != null ? player.win_rate.toFixed(1) : null
  const totalM = player?.total_matches ?? null
  const wins = player?.wins ?? 0

  return [
    {
      id: 'elo',
      label: 'Влияние',
      value: elo !== null ? `${elo} ELO` : '—',
      variant: 'gold',
      badge: 'RTG',
    },
    {
      id: 'winrate',
      label: 'Винрейт',
      value: wr !== null ? `${wr}%` : '—',
      variant: wr !== null && Number(wr) >= 50 ? 'win' : 'lose',
      badge: 'WR',
      sub: `${wins} побед`,
    },
    {
      id: 'avg_damage',
      label: 'Ср. урон',
      value: dmg !== null ? dmg : '—',
      badge: 'DMG',
      ctx: maxDmg !== null ? `Рекорд: ${maxDmg}` : undefined,
    },
    {
      id: 'matches',
      label: 'Матчей',
      value: totalM !== null ? totalM : '—',
      badge: 'MCH',
    },
    {
      id: 'avg_kills',
      label: 'Ср. киллы',
      value: kills !== null ? kills : '—',
      badge: 'KILLS',
      ctx: maxKills !== null ? `Рекорд: ${maxKills}` : undefined,
    },
    {
      id: 'max_damage',
      label: 'Лучший урон',
      value: maxDmg !== null ? maxDmg : '—',
      variant: 'accent',
      badge: 'PEAK',
    },
    {
      id: 'form',
      label: 'Форма',
      value: matches.length > 0 ? `${matches.length} матч.` : '—',
      badge: 'FORM',
      sub:
        matches.length > 0 ? (
          <FormStrip matches={matches} nick={nick} />
        ) : undefined,
    },
  ]
}
