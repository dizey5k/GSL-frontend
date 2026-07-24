'use client'

import { fmt, makeAvatar } from '../utils'
import styles from '../../FamilyModal.module.scss'
import { FamilyStats } from '@/types'
import Image from 'next/image'

interface Props {
  family: FamilyStats
}

export function FamilyHeader({ family }: Props) {
  const elo = family?.rating != null ? Math.round(family.rating) : null
  const srv = family?.primary_server || ''
  const members = family?.member_count ?? null
  const logo = family?.logo_url || makeAvatar(family?.family_name || '')

  return (
    <div className={styles.cover}>
      <div className={styles.coverShade} />
      <div className={styles.coverInner}>
        <Image
          className={styles.logo}
          src={logo}
          width={76}
          height={76}
          alt={family?.family_name}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = makeAvatar(
              family?.family_name || '',
            )
          }}
        />
        <div className={styles.coverId}>
          <div className={styles.coverTag}>Семья</div>
          <h2 className={styles.coverName}>{family?.family_name || '—'}</h2>
          <div className={styles.coverMeta}>
            {members !== null && <span>{members} игроков</span>}
            {srv && (
              <span>
                Сервер <b>{srv}</b>
              </span>
            )}
          </div>
        </div>
        <div className={styles.eloBlock}>
          <span className={styles.eloNum}>{elo !== null ? fmt(elo) : '—'}</span>
          <span className={styles.eloLbl}>ELO</span>
        </div>
      </div>
    </div>
  )
}
