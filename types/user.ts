export interface User {
  id: number;
  discord_id: string;
  discord_username: string;
  discord_avatar: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_admin: boolean;
  is_verified: boolean;
  player_nickname: string | null;
  is_media_verified: boolean;
  is_banned: boolean;
  balance: number;
  tickets: number;
  tg_user_id: number | null;
  tg_notify: boolean;
  tfa_enabled: boolean;
  nick_color?: string;
  nick_prefix?: string;
  nick_suffix?: string;
  badge_verified: boolean;
  wall_privacy: "all" | "friends" | "none";
  dm_privacy: "all" | "friends" | "none";
  stream_twitch?: string;
  stream_youtube?: string;
  stream_primary?: "twitch" | "youtube" | "none";
  family?: UserFamily;
  admin_role?:
    | "moderator"
    | "admin"
    | "senior_admin"
    | "head_admin"
    | "superadmin";
  created_at: string;
}

export interface UserFamily {
  family_id: number;
  family_name: string;
  role: "owner" | "member";
  is_public_in_clubs: boolean;
}

export interface AuthResponse {
  user: User | null;
}

export interface ClaimStatus {
  id: number;
  status: "pending" | "approved" | "rejected";
  player_nickname: string;
  source: "capt" | "gangame" | "both";
  server_id: string;
  admin_note?: string;
  created_at: string;
}
