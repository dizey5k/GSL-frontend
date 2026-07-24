import type { FamilyStats } from '@/types'
import styles from '../../FamilyModal.module.scss'

interface Props {
  family: FamilyStats
}

export function FamilyActions({ family }: Props) {
  const familyName = family?.family_name

  return (
    <div className={styles.actions}>
      <div className={styles.actionsGroup}>
        <a
          className={styles.actionBtn}
          href={`/family/${encodeURIComponent(familyName)}`}
        >
          Профиль
        </a>
        <a
          className={styles.actionBtn}
          href={`/compare?f1=${encodeURIComponent(familyName)}`}
        >
          Сравнить
        </a>
      </div>
    </div>
  )
}
