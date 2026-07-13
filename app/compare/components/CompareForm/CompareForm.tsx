'use client'

import { useCompareStore } from '@/store/compareStore'
import CompareAutocomplete from '../CompareAutocomplete/CompareAutocomplete'
import styles from './CompareForm.module.scss'

const PLACEHOLDERS: Record<string, string> = {
  players: 'Ник первого игрока',
  families: 'Название первой семьи',
  gangame: 'Ник первого игрока (гангейм)',
}

export default function CompareForm() {
  const { mode, valueA, valueB, setValueA, setValueB } = useCompareStore()

  const handleCompare = () => {
    if (!valueA || !valueB) return
    // Логика сравнения — будет в Results
  }

  return (
    <div className={styles.form}>
      <CompareAutocomplete
        mode={mode}
        value={valueA}
        onChange={setValueA}
        placeholder={PLACEHOLDERS[mode] || 'Введите значение'}
      />
      <div className={styles.vs}>VS</div>
      <CompareAutocomplete
        mode={mode}
        value={valueB}
        onChange={setValueB}
        placeholder={PLACEHOLDERS[mode] || 'Введите значение'}
      />
      <button className={styles.button} onClick={handleCompare}>
        Сравнить
      </button>
    </div>
  )
}
