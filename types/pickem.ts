export type PickemPhase = 'pre_event' | 'daily' | 'finale'
export type PickemAnswerType = 'radio' | 'dropdown' | 'number'
export type PickemStatus = 'draft' | 'open' | 'locked' | 'resolved'
export type PickemCampaignStatus = 'draft' | 'published' | 'archived'

export interface PickemCampaign {
  id: number
  slug: string
  title: string
  subtitle?: string
  description?: string
  hero_image_url?: string
  server_id?: number
  status: PickemCampaignStatus
  starts_at?: string
  ends_at?: string
  day_count: number
  settings: {
    hero_badge?: string
  }
}

export interface PickemFamily {
  id: number
  name: string
  logo_url?: string
  seed: number
}

export interface PickemOption {
  id: number
  label: string
  value: string
  family_id?: number
  family_name?: string
  logo_url?: string | null
}

export interface PickemQuestion {
  id: number
  phase: PickemPhase
  day_number: number
  title: string
  description?: string
  answer_type: PickemAnswerType
  points: number
  points_multiplier: number
  points_effective: number
  status: PickemStatus
  opens_at?: string
  closes_at?: string
  sort_order: number
  options: PickemOption[]
  community_pct: Record<number, number>
  my_pick: {
    option_id: number | null
    value_text: string | null
    is_correct: boolean | null
    points_earned: number
  } | null
  has_result: boolean
  correct_option_id?: number
  correct_value?: string
}

export interface PickemScore {
  total_points: number
  correct_count: number
  total_count: number
}

export interface PickemFeed {
  campaign: PickemCampaign
  families: PickemFamily[]
  questions: PickemQuestion[]
  day_tabs: Array<{
    key: string
    label: string
    phase: string | null
    day_number: number | null
  }>
  my: {
    score: PickemScore
  }
}

export interface PickemLeaderboardEntry {
  user_id: number
  total_points: number
  correct_count: number
  total_count: number
  display_name: string
  discord_username: string
  player_nickname: string | null
  avatar_url: string | null
}
