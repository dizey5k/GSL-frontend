// frontend/lib/constants.ts
export const SITE_NAME = 'GSL — GTA HLTV Majestic RP'
export const SITE_URL = 'https://gsl.best'

export const NAV_LINKS = [
  { href: '/', label: 'Главная' },
  {
    label: 'Тир лист',
    dropdown: [
      { href: '/duel-rating', label: 'Гангейм' },
      { href: '/tier-list-families', label: 'Семьи' },
      { href: '/tier-list-players', label: 'Игроки' },
    ],
  },
  { href: '/roulette', label: 'Рулетка' },
  { href: '/pickem', label: "Pick'em" },
  {
    label: 'Клубы',
    dropdown: [
      { href: '/clubs?tab=families', label: 'Семьи' },
      { href: '/clubs?tab=players', label: 'Игроки' },
    ],
  },
  { href: '/constructor', label: 'Конструктор' },
]

export const FOOTER_LINKS = [
  { href: '/tier-list-players', label: 'Игроки' },
  { href: '/tier-list-families', label: 'Семьи' },
  { href: '/compare', label: 'Сравнение' },
  { href: '/guide', label: 'Гайд' },
  { href: '/about', label: 'О проекте' },
  { href: '/privacy', label: 'Политика конфиденциальности' },
  { href: '/terms', label: 'Пользовательское соглашение' },
]

export const SERVERS = [
  { id: 'RU1', name: 'New York' },
  { id: 'RU2', name: 'Detroit' },
  { id: 'RU3', name: 'Chicago' },
  { id: 'RU4', name: 'San Francisco' },
  { id: 'RU5', name: 'Atlanta' },
  { id: 'RU6', name: 'San Diego' },
  { id: 'RU7', name: 'Los Angeles' },
  { id: 'RU8', name: 'Miami' },
  { id: 'RU9', name: 'Las Vegas' },
  { id: 'RU10', name: 'Washington' },
  { id: 'RU11', name: 'Dallas' },
  { id: 'RU12', name: 'Boston' },
  { id: 'RU13', name: 'Houston' },
  { id: 'RU14', name: 'Seattle' },
  { id: 'RU15', name: 'Phoenix' },
  { id: 'RU16', name: 'Denver' },
  { id: 'RU17', name: 'Portland' },
  { id: 'RU18', name: 'Orlando' },
  { id: 'RU19', name: 'Memphis' },
]

export const ADMIN_ROLES = [
  { role: 'moderator', label: 'Модератор', level: 1 },
  { role: 'admin', label: 'Админ', level: 2 },
  { role: 'senior_admin', label: 'Ст. админ', level: 3 },
  { role: 'head_admin', label: 'Гл. админ', level: 4 },
  { role: 'superadmin', label: 'Руководитель', level: 5 },
]

export const RATING_TIERS = [
  { level: 'S', min: 1750, color: '#EAF370' },
  { level: 'A', min: 1500, color: '#7BF370' },
  { level: 'B', min: 1250, color: '#F3A770' },
  { level: 'C', min: 1000, color: '#787878' },
  { level: 'D', min: 0, color: '#5e5e68' },
]
