import { getMetadata } from '@/app/metadata'

export const metadata = getMetadata({
  title: 'Тир-лист игроков Majestic RP — рейтинг ELO | GSL',
  description:
    'Рейтинг игроков Majestic RP на GSL: ELO, урон, винрейт, фильтр по серверу. HLTV-статистика для каптов и профили игроков.',
  openGraph: {
    title: 'Тир-лист игроков Majestic RP — рейтинг ELO | GSL',
    description:
      'Рейтинг игроков Majestic RP на GSL: ELO, урон, винрейт, фильтр по серверу.',
  },
  alternates: {
    canonical: '/tier-list-players',
  },
})
