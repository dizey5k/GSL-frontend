import { getMetadata } from '@/app/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = getMetadata({
  title: 'Гайд по рейтингу и тир-листу Majestic RP | GSL.BEST',
  description:
    'Гайд GSL — как попасть в тир-лист и HLTV Majestic GTA. Для дуэлей зайдите в Discord и следуйте инструкциям.',
  openGraph: {
    title: 'Гайд по рейтингу и тир-листу Majestic RP | GSL.BEST',
    description: 'Гайд GSL — как попасть в тир-лист и HLTV Majestic GTA.',
    images: ['/family-const/tier-preview.png'],
  },
  twitter: {
    title: 'Гайд по рейтингу и тир-листу Majestic RP | GSL.BEST',
    description: 'Гайд GSL — как попасть в тир-лист и HLTV Majestic GTA.',
    images: ['/family-const/tier-preview.png'],
  },
  alternates: {
    canonical: '/guide',
  },
})
