import { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { getMetadata } from '@/app/metadata'

export const metadata: Metadata = getMetadata({
  title: 'GSL — GTA HLTV и тир-лист Majestic RP | GSL.BEST',
  description:
    'GSL — HLTV-сообщество для GTA Majestic RP: тир-листы семей и игроков, ELO, профили, рейтинг семей, сравнение и статистика каптов.',
  openGraph: {
    title: 'GSL — GTA HLTV и тир-лист Majestic RP',
    description:
      'HLTV для GTA Majestic RP: тир-листы, ELO, профили игроков, рейтинг семей и статистика каптов.',
  },
})

async function fetchTopRankings(
  type: 'families' | 'players',
  limit: number = 10,
) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const res = await fetch(`${baseUrl}/api/leaderboard/${type}?limit=${limit}`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.data || []
}

async function fetchNews() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const res = await fetch(`${baseUrl}/api/home/news?limit=8`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.news || []
}

async function fetchBanners() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const res = await fetch(`${baseUrl}/api/home/banners`, {
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.banners || []
}

export default async function HomePage() {
  const [families, players, news, banners] = await Promise.all([
    fetchTopRankings('families', 10),
    fetchTopRankings('players', 10),
    fetchNews(),
    fetchBanners(),
  ])

  return (
    <HomePageClient
      initialFamilies={families}
      initialPlayers={players}
      initialNews={news}
      initialBanners={banners}
    />
  )
}
