import { Key } from 'react'
import { Tabs } from '@heroui/react'

import styles from './DayTabs.module.scss'

interface DayTab {
  key: string
  label: string
  phase: string | null
  day_number: number | null
}

interface Props {
  tabs: DayTab[]
  activeKey: string
  onTabChange: (key: string) => void
}

export default function DayTabs({ tabs, activeKey, onTabChange }: Props) {
  if (!tabs.length) return null

  return (
    <div className={styles.tabs}>
      <Tabs
        aria-label="Дни"
        selectedKey={activeKey}
        onSelectionChange={(key: Key) => onTabChange(String(key))}
        variant="primary"
        className={styles.tabsRoot}
      >
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Tab id={tab.key} key={tab.key}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  )
}
