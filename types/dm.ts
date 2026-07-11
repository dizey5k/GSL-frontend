export interface DMThread {
  id: number;
  peer: {
    id: number;
    display_name: string | null;
    discord_username: string;
    player_nickname: string | null;
    avatar_url: string | null;
    is_online: boolean;
  };
  unread: number;
  last_msg_at: string;
  last_body?: string;
}

export interface DMMessage {
  id: number;
  from_user_id: number;
  body: string;
  is_read: boolean;
  created_at: string;
}

export interface DMThreadResponse {
  thread: DMThread;
  messages: DMMessage[];
}
