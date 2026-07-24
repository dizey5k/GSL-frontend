import { PickemQuestion } from '@/types'
import { Skeleton } from '@heroui/react'
import styles from './QuestionList.module.scss'
import { QuestionCard } from '../QuestionCard'

interface Props {
  questions: PickemQuestion[]
  campaignId: number
  loading: boolean
  onPickSubmitted: () => void
}

export default function QuestionList({
  questions,
  campaignId,
  loading,
  onPickSubmitted,
}: Props) {
  if (loading) {
    return (
      <div className={styles.skeletonList}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.skeletonItem}>
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 rounded-lg mt-2" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (questions.length === 0) {
    return <div className={styles.empty}>На этот день нет вопросов</div>
  }

  return (
    <div className={styles.list}>
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          campaignId={campaignId}
          onSuccess={onPickSubmitted}
        />
      ))}
    </div>
  )
}
