'use client'

import { useUIStore } from '@/store'
import { useFamily } from '@/hooks'
import styles from './FamilyModal.module.scss'

export function FamilyModal() {
  const { modals, closeModal } = useUIStore()
  const { open, data } = modals.family
  const name = data?.name

  const { data: family, isLoading } = useFamily(name)

  if (!open) return null

  const handleClose = () => closeModal('family')

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={handleClose}>
          ×
        </button>
        {isLoading && <div className={styles.loading}>Загрузка...</div>}
        {!isLoading && family && (
          <div>
            <h2>{family.family_name}</h2>
            <p>
              ELO: {family.rating != null ? Math.round(family.rating) : '—'}
            </p>
            <p>
              Винрейт:{' '}
              {family.win_rate != null
                ? Number(family.win_rate).toFixed(1) + '%'
                : '—'}
            </p>
            <p>Матчей: {family.total_matches ?? '—'}</p>
            {family.primary_server && <p>Сервер: {family.primary_server}</p>}
            {family.member_count != null && (
              <p>Участников: {family.member_count}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
