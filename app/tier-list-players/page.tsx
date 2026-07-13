'use client'

import { TierListPage } from '@/components/tier-list'
import { TierListItem } from '@/components/tier-list/types'

const mapPlayerToItem = (player: any, index: number): TierListItem => ({
  rank: player.position || index + 1,
  id: player.player_nickname || String(index),
  name: player.player_nickname || '—',
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(player.player_nickname || '')}&background=2a2a2e&color=fff&size=88`,
  stats: {
    matches: player.total_matches || 0,
    winRate: player.win_rate != null ? Number(player.win_rate) : null,
    elo: player.rating != null ? Math.round(player.rating) : null,
    server: player.server_id || null,
  },
  raw: player,
})

export default function TierListPlayersPage() {
  return (
    <TierListPage
      type="players"
      title="Тир-лист игроков Majestic RP"
      description="Рейтинг игроков Majestic RP на GSL — GTA HLTV: ELO в каптах, урон, винрейт, фильтр по серверу и сравнение."
      mapDataToItem={mapPlayerToItem}
      getModalData={(item) => ({
        nick: item.raw?.player_nickname || item.name,
      })}
    />
  )
}
