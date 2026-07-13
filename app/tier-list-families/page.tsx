'use client'

import { TierListPage } from '@/components/tier-list'
import { TierListItem } from '@/components/tier-list/types'

const mapFamilyToItem = (family: any, index: number): TierListItem => {
  const logo =
    family.logo_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(family.family_name || '')}&background=2a2a2e&color=fff&size=88`

  return {
    rank: family.position || index + 1,
    id: family.family_name || String(index),
    name: family.family_name || '—',
    avatar: logo,
    stats: {
      matches: family.total_matches || 0,
      winRate: family.win_rate != null ? Number(family.win_rate) : null,
      elo: family.rating != null ? Math.round(family.rating) : null,
      server: family.primary_server || null,
      memberCount: family.member_count || 0,
    },
    raw: family,
  }
}

export default function TierListFamiliesPage() {
  return (
    <TierListPage
      type="families"
      title="Тир-лист семей Majestic RP"
      description="Рейтинг семей Majestic RP в каптах — GSL GTA HLTV: винрейт, ELO, предиктор и сравнение соперников на серверах Majestic."
      mapDataToItem={mapFamilyToItem}
      getModalData={(item) => ({ name: item.raw?.family_name || item.name })}
    />
  )
}
