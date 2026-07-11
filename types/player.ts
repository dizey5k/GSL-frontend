export interface PlayerStats {
  player_nickname: string;
  rating: number;
  win_rate: number;
  total_matches: number;
  total_kills: number;
  total_damage: number;
  avg_kills: number;
  avg_damage: number;
  max_kills: number;
  max_damage: number;
  last_family?: string;
  server_id?: string;
  primary_server?: string;
  rank?: number;
  wins?: number;
  losses?: number;
  position?: number;
}

export interface PlayerMatch {
  match_id: number;
  family_name: string;
  family_1_name?: string;
  family_2_name?: string;
  winner?: string;
  kills: number;
  damage: number;
  rating_change?: number;
  rating_after?: number;
  date: string;
  server_id?: string;
  is_mvp?: boolean;
}

export interface PlayerHistory {
  matches: PlayerMatch[];
  rating_history?: PlayerRatingPoint[];
}

export interface PlayerRatingPoint {
  rating: number;
  created_at: string;
  match_id?: number;
}

export interface PlayerCompareData {
  player1: {
    stats: PlayerStats;
    recent_matches: PlayerMatch[];
  };
  player2: {
    stats: PlayerStats;
    recent_matches: PlayerMatch[];
  };
  prediction?: MatchPrediction;
}

export interface MatchPrediction {
  winner: string;
  confidence: number;
}
