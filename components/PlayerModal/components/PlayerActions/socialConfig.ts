import { ReactNode } from 'react'
import { CFG_ICON, TG_ICON, TWITCH_ICON, YT_ICON } from '../utils'

export interface SocialItem {
  icon: ReactNode
  title: string
  href?: string
  disabled?: boolean
}

export const SOCIAL_CONFIG: SocialItem[] = [
  { icon: CFG_ICON, title: 'CFG', disabled: true },
  { icon: TG_ICON, title: 'Telegram', disabled: true },
  { icon: TWITCH_ICON, title: 'Twitch', disabled: true },
  { icon: YT_ICON, title: 'YouTube', disabled: true },
]
