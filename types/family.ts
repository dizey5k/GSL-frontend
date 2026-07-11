import { MatchPrediction } from "./player";

export interface FamilyStats {
  family_name: string;
  rating: number;
  win_rate: number;
  total_matches: number;
  total_damage?: number;
  avg_team_damage?: number;
  primary_server?: string;
  wins?: number;
  losses?: number;
}

export interface FamilyMatch {
  match_id: number;
  family_name: string;
  opponent: string;
  result: "win" | "loss" | "draw";
  score: string;
  date: string;
  server_id?: string;
}

export interface FamilyHistory {
  matches: FamilyMatch[];
}

export interface FamilyCompareData {
  family1: {
    stats: FamilyStats;
    recent_matches: FamilyMatch[];
  };
  family2: {
    stats: FamilyStats;
    recent_matches: FamilyMatch[];
  };
  prediction?: MatchPrediction;
}
