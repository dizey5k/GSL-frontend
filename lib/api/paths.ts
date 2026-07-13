export const API_BASE = '/api'
export const AUTH_BASE = `${API_BASE}/auth`
export const ADMIN_BASE = `${API_BASE}/admin`

export const API_PATHS = {
  auth: {
    me: `${AUTH_BASE}/me`,
    logout: `${AUTH_BASE}/logout`,
    claimStatus: `${AUTH_BASE}/claim-status`,
    submitClaim: `${API_BASE}/claims`,
    tfaStatus: `${AUTH_BASE}/2fa/status`,
    tfaLink: `${AUTH_BASE}/2fa/link`,
    tfaVerify: `${AUTH_BASE}/2fa/verify`,
    tfaResend: `${AUTH_BASE}/2fa/resend`,
  },

  players: {
    get: (nick: string) => `${API_BASE}/players/${encodeURIComponent(nick)}`,
    history: (nick: string) =>
      `${API_BASE}/player/${encodeURIComponent(nick)}/history`,
    rank: (nick: string) =>
      `${API_BASE}/users/${encodeURIComponent(nick)}/rank`,
    ratingHistory: (nick: string) =>
      `${API_BASE}/players/${encodeURIComponent(nick)}/rating-history`,
    search: `${API_BASE}/search/players`,
    compare: `${API_BASE}/compare/players`,
  },

  // Families
  families: {
    get: (name: string) => `${API_BASE}/families/${encodeURIComponent(name)}`,
    history: (name: string) =>
      `${API_BASE}/family/${encodeURIComponent(name)}/history`,
    search: `${API_BASE}/search/families`,
    compare: `${API_BASE}/compare/families`,
    predict: `${API_BASE}/predict/match`,
    map: `${API_BASE}/families/map`,
  },

  leaderboard: {
    players: `${API_BASE}/leaderboard/players`,
    families: `${API_BASE}/leaderboard/families`,
    characters: `${API_BASE}/leaderboard/characters`,
    top: `${API_BASE}/top`,
  },

  roulette: {
    prizes: `${API_BASE}/roulette/prizes`,
    spin: `${API_BASE}/roulette/spin`,
    recent: `${API_BASE}/roulette/recent`,
    stats: `${API_BASE}/roulette/stats`,
    quests: `${API_BASE}/roulette/quests`,
    claimQuest: `${API_BASE}/roulette/quests/claim`,
    feed: `${API_BASE}/roulette/feed`,
    claims: `${API_BASE}/roulette/claims`,
    audit: `${API_BASE}/roulette/audit`,
    settings: `${API_BASE}/roulette/settings`,
    balance: `${API_BASE}/roulette/balance`,
    tickets: `${API_BASE}/roulette/tickets`,
    bulkTickets: `${API_BASE}/roulette/tickets/bulk`,
  },

  user: {
    profile: `${API_BASE}/profile`,
    avatar: `${API_BASE}/profile/avatar`,
    cover: `${API_BASE}/profile/cover`,
    background: `${API_BASE}/profile/background`,
    characters: `${API_BASE}/profile/characters`,
    cfg: `${API_BASE}/profile/cfg`,
    nickStyle: `${API_BASE}/users/me/nick-style`,
    mergeRequests: `${API_BASE}/profile/merge-requests`,
    submitMerge: `${API_BASE}/profile/merge-request`,
    nickRequests: `${API_BASE}/profile/nick-requests`,
    submitNickChange: `${API_BASE}/profile/nick-request`,
    bindings: `${API_BASE}/user-avatars`,
    nickStyles: `${API_BASE}/user-nick-styles`,
    socials: `${API_BASE}/user-socials`,
    cfgs: `${API_BASE}/user-cfgs`,
    streamLinks: `${API_BASE}/users/me/stream-links`,
  },

  clubs: {
    families: `${API_BASE}/clubs/families`,
    players: `${API_BASE}/clubs/players`,
    myPlayerProfile: `${API_BASE}/clubs/players/me`,
  },

  dm: {
    threads: `${API_BASE}/dm/threads`,
    thread: (userId: number) => `${API_BASE}/dm/threads/${userId}`,
    typing: (userId: number) => `${API_BASE}/dm/threads/${userId}/typing`,
    stream: `${API_BASE}/dm/stream`,
  },

  wall: {
    posts: (target: string) => `${API_BASE}/wall/${encodeURIComponent(target)}`,
    like: (postId: number) => `${API_BASE}/wall/post/${postId}/like`,
    reply: (postId: number) => `${API_BASE}/wall/post/${postId}/reply`,
    repost: (postId: number) => `${API_BASE}/wall/post/${postId}/repost`,
    delete: (postId: number) => `${API_BASE}/wall/post/${postId}`,
    admin: `${ADMIN_BASE}/wall/posts`,
    adminStats: `${ADMIN_BASE}/wall/stats`,
    adminAction: (postId: number) => `${ADMIN_BASE}/wall/posts/${postId}`,
  },

  pickem: {
    campaigns: `${API_BASE}/pickem/campaigns`,
    campaign: (slug: string) => `${API_BASE}/pickem/campaigns/${slug}`,
    feed: (slug: string) => `${API_BASE}/pickem/campaigns/${slug}/feed`,
    picks: `${API_BASE}/pickem/picks`,
    leaderboard: (campaignId: number) =>
      `${API_BASE}/pickem/campaigns/${campaignId}/leaderboard`,
    myStats: `${API_BASE}/pickem/my/stats`,
    adminCampaigns: `${ADMIN_BASE}/pickem/campaigns`,
    adminQuestions: `${ADMIN_BASE}/pickem/questions`,
    adminResolve: (questionId: number) =>
      `${ADMIN_BASE}/pickem/questions/${questionId}/resolve`,
  },

  duel: {
    player: (nick: string) =>
      `${API_BASE}/duels/player/${encodeURIComponent(nick)}`,
    history: (nick: string) =>
      `${API_BASE}/duels/player/${encodeURIComponent(nick)}/history`,
    chart: (nick: string) =>
      `${API_BASE}/duels/player/${encodeURIComponent(nick)}/chart`,
    servers: (nick: string) =>
      `${API_BASE}/duels/player/${encodeURIComponent(nick)}/servers`,
    leaderboard: `${API_BASE}/duels/leaderboard`,
    search: `${API_BASE}/duels/search`,
    compare: `${API_BASE}/duels/compare`,
    adminMatches: `${ADMIN_BASE}/duels/matches`,
    adminMatch: (matchId: number) => `${ADMIN_BASE}/duels/matches/${matchId}`,
    adminParticipants: (matchId: number) =>
      `${ADMIN_BASE}/duels/matches/${matchId}/participants`,
  },

  compare: {
    players: `${API_BASE}/compare/players`,
    families: `${API_BASE}/compare/families`,
  },

  search: {
    players: `${API_BASE}/search/players`,
    families: `${API_BASE}/search/families`,
  },

  tournaments: {
    list: `${API_BASE}/tournaments`,
    admin: `${ADMIN_BASE}/tournaments`,
    adminItem: (id: number) => `${ADMIN_BASE}/tournaments/${id}`,
  },
  achievements: {
    list: `${API_BASE}/site/achievements`,
    admin: `${ADMIN_BASE}/achievements`,
    adminItem: (id: number) => `${ADMIN_BASE}/achievements/${id}`,
    grant: `${ADMIN_BASE}/achievements/grant`,
    revoke: (grantId: number) => `${ADMIN_BASE}/achievements/grant/${grantId}`,
  },

  media: {
    live: `${API_BASE}/media/live`,
    highlights: (nick: string) =>
      `${API_BASE}/media/highlights/${encodeURIComponent(nick)}`,
    pinHighlight: `${API_BASE}/media/highlights/pin`,
    unpinHighlight: (pinId: number) =>
      `${API_BASE}/media/highlights/pin/${pinId}`,
    vod: `${API_BASE}/media/vod`,
    vodItem: (matchId: number) => `${API_BASE}/media/vod/${matchId}`,
    botStatus: `${API_BASE}/media/bot/status`,
    botConnect: `${API_BASE}/media/bot/connect`,
    botDisconnect: `${API_BASE}/media/bot/disconnect`,
  },

  admin: {
    users: `${ADMIN_BASE}/users`,
    user: (id: number) => `${ADMIN_BASE}/users/${id}`,
    userBan: (id: number) => `${ADMIN_BASE}/users/${id}/ban`,
    userUnban: (id: number) => `${ADMIN_BASE}/users/${id}/unban`,
    userCharacters: (id: number) => `${ADMIN_BASE}/users/${id}/characters`,
    userChar: (userId: number, charId: number) =>
      `${ADMIN_BASE}/users/${userId}/characters/${charId}`,
    userBindNick: (id: number) => `${ADMIN_BASE}/users/${id}/bind-nick`,
    claims: `${ADMIN_BASE}/claims`,
    claim: (id: number) => `${ADMIN_BASE}/claims/${id}`,
    familyClaims: `${ADMIN_BASE}/family-claims`,
    familyClaim: (id: number) => `${ADMIN_BASE}/family-claims/${id}`,
    families: `${ADMIN_BASE}/families`,
    family: (id: number) => `${ADMIN_BASE}/families/${id}`,
    familyMembers: (id: number) => `${ADMIN_BASE}/families/${id}/members`,
    familyMember: (familyId: number, userId: number) =>
      `${ADMIN_BASE}/families/${familyId}/members/${userId}`,
    mergeRequests: `${ADMIN_BASE}/merge-requests`,
    mergeRequest: (id: number) => `${ADMIN_BASE}/merge-requests/${id}`,
    nickRequests: `${ADMIN_BASE}/nick-requests`,
    nickRequest: (id: number) => `${ADMIN_BASE}/nick-requests/${id}`,
    matchReports: `${ADMIN_BASE}/match-reports`,
    matchReport: (id: number) => `${ADMIN_BASE}/match-reports/${id}`,
    rouletteClaims: `${ADMIN_BASE}/roulette/claims`,
    rouletteClaim: (id: number) => `${ADMIN_BASE}/roulette/claims/${id}`,
    roulettePrizes: `${ADMIN_BASE}/roulette/prizes`,
    roulettePrize: (id: number) => `${ADMIN_BASE}/roulette/prizes/${id}`,
    rouletteSettings: `${ADMIN_BASE}/roulette/settings`,
    rouletteStats: `${ADMIN_BASE}/roulette/stats`,
    rouletteAudit: `${ADMIN_BASE}/roulette/audit`,
    rouletteTicketsBulk: `${ADMIN_BASE}/roulette/tickets/bulk`,
    statsRefresh: `${ADMIN_BASE}/stats/refresh`,
    avatarsSync: `${ADMIN_BASE}/avatars/sync`,
    feed: `${ADMIN_BASE}/feed`,
    feedItem: (id: number) => `${ADMIN_BASE}/feed/${id}`,
    feedPurge: `${ADMIN_BASE}/feed/purge`,
    siteSettings: `${ADMIN_BASE}/site-settings`,
    siteLock: `${ADMIN_BASE}/site-lock`,
    notifications: `${ADMIN_BASE}/notifications/send`,
    notificationHistory: `${ADMIN_BASE}/notifications/recent`,
    tgBroadcast: `${ADMIN_BASE}/tg-broadcast/send`,
    tgBroadcastJobs: `${ADMIN_BASE}/tg-broadcast/jobs`,
    tgBroadcastJob: (id: number) => `${ADMIN_BASE}/tg-broadcast/jobs/${id}`,
    tgAudience: `${ADMIN_BASE}/tg-broadcast/audience`,
    moderationStats: `${ADMIN_BASE}/moderation/stats`,
    // Stats admin (capt matches)
    statsMatches: `${ADMIN_BASE}/stats/matches`,
    statsMatch: (id: number) => `${ADMIN_BASE}/stats/matches/${id}`,
    statsMatchPlayers: (matchId: number) =>
      `${ADMIN_BASE}/stats/matches/${matchId}/players`,
    statsMatchExclude: (matchId: number) =>
      `${ADMIN_BASE}/stats/matches/${matchId}/exclude`,
    statsPlayerRecalc: (nick: string) =>
      `${ADMIN_BASE}/stats/players/${encodeURIComponent(nick)}/recalculate`,
    statsBans: `${ADMIN_BASE}/stats/bans`,
    statsActionLog: `${ADMIN_BASE}/stats/action-log`,
    // Gangame admin
    gangameMatches: `${ADMIN_BASE}/duels/matches`,
    gangameMatch: (id: number) => `${ADMIN_BASE}/duels/matches/${id}`,
    gangameParticipants: (matchId: number) =>
      `${ADMIN_BASE}/duels/matches/${matchId}/participants`,
    gangameSearch: `${ADMIN_BASE}/duels/search`,
  },

  site: {
    lockStatus: `${API_BASE}/site-lock/status`,
    unlock: `${API_BASE}/site-lock/unlock`,
    alert: `${API_BASE}/site/alert`,
    onlineCount: `${API_BASE}/presence/online-count`,
    ping: `${API_BASE}/presence/ping`,
  },

  widget: {
    stream: (nick: string) =>
      `${API_BASE}/widget/stream/${encodeURIComponent(nick)}`,
    stats: (nick: string) =>
      `${API_BASE}/widget/stats/${encodeURIComponent(nick)}`,
    duel: (nick: string) =>
      `${API_BASE}/widget/duel/${encodeURIComponent(nick)}`,
    postMatch: (nick: string) =>
      `${API_BASE}/widget/post-match/${encodeURIComponent(nick)}`,
  },

  home: {
    banners: `${API_BASE}/home/banners`,
    news: `${API_BASE}/home/news`,
    videos: `${API_BASE}/home/videos`,
    streamers: `${API_BASE}/home/streamers`,
  },
} as const

export type ApiPath = typeof API_PATHS
