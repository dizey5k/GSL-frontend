'use client'

import { useUIStore } from '@/store'
import { useFamily, useFamilyHistory } from '@/hooks'
import { ModalShell, ModalBody } from '@/components/ui/modal-common'
import styles from './FamilyModal.module.scss'
import {
  FamilyActions,
  FamilyForm,
  FamilyHeader,
  FamilySkeleton,
  FamilyStats,
  FamilyTabs,
} from './components'

export function FamilyModal() {
  const { modals, closeModal } = useUIStore()
  const { open, data } = modals.family
  const name = data?.name

  const { data: family, isLoading } = useFamily(name)
  const { data: historyRes } = useFamilyHistory(name, {
    period: '1y',
    limit: 10,
  })

  if (!open) return null

  const handleClose = () => closeModal('family')
  const matches = (historyRes as any)?.matches || []

  return (
    <ModalShell onClose={handleClose} maxWidth={900}>
      <ModalBody>
        {isLoading ? (
          <FamilySkeleton />
        ) : family ? (
          <>
            <FamilyHeader family={family} />
            <FamilyActions familyName={family.family_name} />
            <FamilyStats family={family} />
            <FamilyForm matches={matches} familyName={family.family_name} />
            <FamilyTabs familyName={family.family_name} matches={matches} />
            <a
              className={styles.linkFoot}
              href={`/family/${encodeURIComponent(family.family_name)}`}
            >
              Полный профиль семьи →
            </a>
          </>
        ) : (
          <div className={styles.emptyState}>Семья не найдена</div>
        )}
      </ModalBody>
    </ModalShell>
  )
}
