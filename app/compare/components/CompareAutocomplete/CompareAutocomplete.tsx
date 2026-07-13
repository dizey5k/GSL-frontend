'use client'

import { useState, useEffect, useRef } from 'react'
import { usePlayerSearch, useFamilySearch, useDuelSearch } from '@/hooks'
import styles from '../Compare.module.scss'

interface Props {
  mode: 'players' | 'families' | 'gangame'
  value: string
  onChange: (val: string) => void
  placeholder: string
}

export default function CompareAutocomplete({
  mode,
  value,
  onChange,
  placeholder,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const playerSearch = usePlayerSearch(
    mode === 'players' || mode === 'gangame' ? value : '',
  )
  const familySearch = useFamilySearch(mode === 'families' ? value : '')
  const duelSearch = useDuelSearch(mode === 'gangame' ? value : '')

  const getSuggestions = () => {
    if (mode === 'players') return playerSearch.data || []
    if (mode === 'gangame') return duelSearch.data || []
    if (mode === 'families') return familySearch.data || []
    return []
  }

  const suggestions = getSuggestions()
  const isLoading =
    playerSearch.isLoading || familySearch.isLoading || duelSearch.isLoading

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    onChange(val)
    setIsOpen(val.length >= 2)
  }

  const handleSelect = (item: string) => {
    onChange(item)
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className={styles.autocompleteWrapper} ref={wrapperRef}>
      <input
        ref={inputRef}
        className={styles.autocompleteInput}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        onFocus={() => value.length >= 2 && setIsOpen(true)}
      />
      {isOpen && (
        <div className={styles.autocompleteList}>
          {isLoading && (
            <div className={styles.autocompleteItem}>Загрузка...</div>
          )}
          {!isLoading && suggestions.length === 0 && value.length >= 2 && (
            <div className={styles.autocompleteItem}>Ничего не найдено</div>
          )}
          {!isLoading &&
            suggestions.map((item: any) => {
              const label =
                item.player_nickname ||
                item.family_name ||
                item.login ||
                item.name
              return (
                <div
                  key={label}
                  className={styles.autocompleteItem}
                  onClick={() => handleSelect(label)}
                >
                  {label}
                </div>
              )
            })}
        </div>
      )}
    </div>
  )
}
