import { Metadata } from 'next'

const SITE_NAME = 'GSL — GTA HLTV Majestic RP'
const SITE_URL = 'https://gsl.best'
const DEFAULT_IMAGE = '/family-const/tier-preview.png'

type MetadataOverrides = Partial<Metadata>

export function getMetadata(overrides: MetadataOverrides = {}): Metadata {
  const base: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'GSL — GTA HLTV и тир-лист Majestic RP | GSL.BEST',
      template: '%s | GSL.BEST',
    },
    description:
      'GSL — HLTV-сообщество для GTA Majestic RP: тир-листы, ELO, профили игроков, рейтинг семей и статистика каптов.',
    keywords: [
      'GSL',
      'GSL.BEST',
      'GSL GTA',
      'Majestic RP',
      'Majestic HLTV',
      'GTA HLTV',
      'тир лист majestic',
      'рейтинг игроков majestic',
      'рейтинг семей majestic',
      'статистика каптов',
      'ELO majestic',
    ],
    openGraph: {
      title: SITE_NAME,
      description:
        'HLTV для GTA Majestic RP: тир-листы, ELO, профили игроков, рейтинг семей и статистика каптов.',
      siteName: SITE_NAME,
      locale: 'ru_RU',
      type: 'website',
      images: [
        {
          url: DEFAULT_IMAGE,
          width: 1200,
          height: 630,
          alt: 'GSL — тир-лист Majestic RP',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description:
        'HLTV для GTA Majestic RP: тир-листы, ELO, профили игроков, рейтинг семей и статистика каптов.',
      images: [DEFAULT_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
    alternates: {
      canonical: '/',
      languages: {
        ru: '/',
        'x-default': '/',
      },
    },
    manifest: '/manifest.webmanifest',
  }

  return {
    ...base,
    ...overrides,
    openGraph: {
      ...base.openGraph,
      ...(overrides.openGraph || {}),
    },
    twitter: {
      ...base.twitter,
      ...(overrides.twitter || {}),
    },
    alternates: {
      ...base.alternates,
      ...(overrides.alternates || {}),
    },
  }
}
