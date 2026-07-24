'use client'

import { ReactNode } from 'react'
import styles from '../../PlayerModal.module.scss'

interface Props {
  icon: ReactNode
  href?: string
  title: string
  disabled?: boolean
}

export function SocialBtn({ icon, href, title, disabled }: Props) {
  if (disabled || !href) {
    return (
      <span className={`${styles.social} ${styles.socialOff}`} title={title}>
        {icon}
      </span>
    )
  }
  return (
    <a
      className={styles.social}
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      title={title}
    >
      {icon}
    </a>
  )
}
