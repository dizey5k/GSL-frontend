import { PlayerStats } from "./player";
import { FamilyStats } from "./family";

export interface LeaderboardPlayersResponse {
  data: PlayerStats[];
  total: number;
  total_pages: number;
  page: number;
}

export interface LeaderboardFamiliesResponse {
  data: FamilyStats[];
  total: number;
  total_pages: number;
  page: number;
}

export interface LeaderboardCharacter {
  player_nickname: string;
  rating: number;
  win_rate: number;
  total_matches: number;
  server_id: string;
  position: number;
}
