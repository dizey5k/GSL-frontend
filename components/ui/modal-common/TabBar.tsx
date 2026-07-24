'use client'

import styles from './TabBar.module.scss'

interface Tab {
  key: string
  label: string
  disabled?: boolean
}

interface TabBarProps {
  tabs: Tab[]
  active: string
  onChange: (key: string) => void
}

export function TabBar({ tabs, active, onChange }: TabBarProps) {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`${styles.tab} ${active === tab.key ? styles.active : ''} ${tab.disabled ? styles.disabled : ''}`}
          onClick={() => !tab.disabled && onChange(tab.key)}
          disabled={tab.disabled}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
