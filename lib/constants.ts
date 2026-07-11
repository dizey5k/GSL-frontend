export const NAV_LINKS = [
  { href: "/", label: "Главная" },
  {
    label: "Тир лист",
    dropdown: [
      { href: "/duel-rating", label: "Гангейм" },
      { href: "/tier-list-semey", label: "Семьи" },
      { href: "/tier-list-igroki", label: "Игроки" },
    ],
  },
  { href: "/roulette", label: "Рулетка" },
  {
    label: "Клубы",
    dropdown: [
      { href: "/clubs?tab=families", label: "Семьи" },
      { href: "/clubs?tab=players", label: "Игроки" },
    ],
  },
  { href: "/constructor", label: "Конструктор" },
];

export const FOOTER_LINKS = [
  { href: "/tier-list-igroki", label: "Игроки" },
  { href: "/tier-list-semey", label: "Семьи" },
  { href: "/compare", label: "Сравнение" },
  { href: "/guide", label: "Гайд" },
  { href: "/about", label: "О проекте" },
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/terms", label: "Пользовательское соглашение" },
];
