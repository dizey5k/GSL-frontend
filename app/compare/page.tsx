'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCompareStore } from '@/store/compareStore'
import CompareTabs from './components/CompareTabs/CompareTabs'
import CompareForm from './components/CompareForm/CompareForm'
import CompareResults from './components/CompareResults/CompareResults'
import styles from './Compare.module.scss'

export default function ComparePage() {
  const searchParams = useSearchParams()
  const { setMode, setValueA, setValueB } = useCompareStore()

  useEffect(() => {
    const mode = searchParams.get('mode') as
      | 'players'
      | 'families'
      | 'gangame'
      | null
    const p1 = searchParams.get('p1') || ''
    const p2 = searchParams.get('p2') || ''
    const f1 = searchParams.get('f1') || ''
    const f2 = searchParams.get('f2') || ''

    if (mode && ['players', 'families', 'gangame'].includes(mode)) {
      setMode(mode)
    }

    if (p1 && p2) {
      setValueA(p1)
      setValueB(p2)
    } else if (f1 && f2) {
      setValueA(f1)
      setValueB(f2)
    }
  }, [searchParams, setMode, setValueA, setValueB])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Сравнение</h1>
        <p className={styles.subtitle}>
          Сравнение игроков и семей Majestic RP на GSL — GTA HLTV: ELO, урон,
          винрейт и форма в каптах.
        </p>
      </div>

      <div className={styles.card}>
        <CompareTabs />
        <CompareForm />
        <CompareResults />
      </div>
    </div>
  )
}
