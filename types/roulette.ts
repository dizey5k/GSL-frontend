export interface RoulettePrize {
  id: number;
  name: string;
  category: "common" | "uncommon" | "rare" | "epic";
  prize_type: "virts" | "ticket" | "vpn" | "mcoin";
  prize_value: string;
  weight: number;
  daily_limit: number;
  enabled: boolean;
}

export interface RouletteSpinResult {
  success: boolean;
  prize: RoulettePrize;
  balance?: number;
  tickets?: number;
  spin_type: "free_daily" | "balance" | "ticket";
}

export interface RouletteRecentWin {
  id: number;
  name: string;
  avatar_url: string;
  prize_name: string;
  category: string;
  prize_type: string;
  created_at: string;
}

export interface RouletteStats {
  spins_today: number;
  spins_week: number;
  pending_claims: number;
  virts_today: number;
  unique_spinners_today: number;
  top_prizes_week: Array<{ name: string; category: string; cnt: number }>;
}
