'use client'

import { useCompareStore } from '@/store/compareStore'
import { useComparePlayers, useCompareFamilies, useDuelCompare } from '@/hooks'
import { Skeleton } from '@heroui/react'
import styles from './CompareResults.module.scss'

function CompareSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonRow}>
        <Skeleton className={styles.skeletonLabel} />
        <Skeleton className={styles.skeletonValue} />
        <Skeleton className={styles.skeletonValue} />
      </div>
      <div className={styles.skeletonRow}>
        <Skeleton className={styles.skeletonLabel} />
        <Skeleton className={styles.skeletonValue} />
        <Skeleton className={styles.skeletonValue} />
      </div>
      <div className={styles.skeletonRow}>
        <Skeleton className={styles.skeletonLabel} />
        <Skeleton className={styles.skeletonValue} />
        <Skeleton className={styles.skeletonValue} />
      </div>
      <div className={styles.skeletonRow}>
        <Skeleton className={styles.skeletonLabel} />
        <Skeleton className={styles.skeletonValue} />
        <Skeleton className={styles.skeletonValue} />
      </div>
      <div className={styles.skeletonRow}>
        <Skeleton className={styles.skeletonLabel} />
        <Skeleton className={styles.skeletonValue} />
        <Skeleton className={styles.skeletonValue} />
      </div>
    </div>
  )
}

export default function CompareResults() {
  const { mode, valueA, valueB } = useCompareStore()

  const players = useComparePlayers(
    mode === 'players' ? valueA : '',
    mode === 'players' ? valueB : '',
  )
  const families = useCompareFamilies(
    mode === 'families' ? valueA : '',
    mode === 'families' ? valueB : '',
  )
  const duel = useDuelCompare(
    mode === 'gangame' ? valueA : '',
    mode === 'gangame' ? valueB : '',
  )

  const isLoading = players.isLoading || families.isLoading || duel.isLoading
  const error = players.error || families.error || duel.error

  if (!valueA || !valueB) {
    return <div className={styles.empty}>Введите оба ника или названия</div>
  }

  if (isLoading) {
    return <CompareSkeleton />
  }

  if (error) {
    return <div className={styles.error}>Ошибка загрузки</div>
  }

  const data =
    mode === 'players'
      ? players.data
      : mode === 'families'
        ? families.data
        : duel.data

  if (!data) {
    return <div className={styles.empty}>Ничего не найдено</div>
  }

  return (
    <div className={styles.results}>
      {/* Здесь будет рендер результатов */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
