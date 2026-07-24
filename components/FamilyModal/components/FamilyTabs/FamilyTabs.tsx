'use client'

import { useState } from 'react'
import { TabBar } from '@/components/ui/modal-common'
import styles from '../../FamilyModal.module.scss'
import { RosterPane } from '../RosterPane'

interface Props {
  familyName: string
  matches: any[]
}

export function FamilyTabs({ familyName, matches }: Props) {
  const [activeTab, setActiveTab] = useState('roster')

  return (
    <>
      <TabBar
        tabs={[
          { key: 'roster', label: 'Ростер' },
          { key: 'capts', label: 'Капты' },
          { key: 'maps', label: 'Карты', disabled: true },
        ]}
        active={activeTab}
        onChange={setActiveTab}
      />
      <div className={styles.pane}>
        {activeTab === 'roster' && <RosterPane />}
        {activeTab === 'capts' &&
          (matches.length > 0 ? (
            <div className={styles.tableWrap}>
              {matches.map((m: any, i: number) => {
                const w = m.winner === familyName || m.result === 'win'
                return (
                  <div key={m.match_id || i} className={styles.matchRow}>
                    <div
                      className={`${styles.matchBadge} ${w ? styles.matchWin : styles.matchLose}`}
                    >
                      {w ? 'W' : 'L'}
                    </div>
                    <div className={styles.matchBody}>
                      <div className={styles.matchVs}>
                        <span>
                          {m.opponent ||
                            (m.family_1_name === familyName
                              ? m.family_2_name
                              : m.family_1_name) ||
                            '—'}
                        </span>
                        <span className={styles.matchSep}>·</span>
                        <span style={{ color: '#888', fontSize: 11 }}>
                          {m.server_id || ''}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>Нет матчей</div>
          ))}
        {activeTab === 'maps' && <div className={styles.emptyState}>Скоро</div>}
      </div>
    </>
  )
}
