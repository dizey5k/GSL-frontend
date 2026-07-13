export interface TierListItem {
  rank: number
  id: string | number
  name: string
  avatar: string
  stats: {
    matches: number
    winRate: number | null
    elo: number | null
    server: string | null
    memberCount?: number
  }
  raw: any
}
