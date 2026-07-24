'use client'

import { useState } from 'react'
import type { PlayerStats, PlayerMatch } from '@/types'
import { TabBar } from '@/components/ui/modal-common'
import { FormStrip } from '../FormStrip/FormStrip'
import styles from '../../PlayerModal.module.scss'
import { GunGame } from '../GunGame'

interface Props {
  nick: string
  server?: string
  matches: PlayerMatch[]
  player: PlayerStats
}

export function PlayerTabs({ nick, server, matches, player }: Props) {
  const [activeTab, setActiveTab] = useState<'capts' | 'gang'>('capts')
  const [gangLoaded, setGangLoaded] = useState(false)

  return (
    <>
      <TabBar
        tabs={[
          { key: 'capts', label: 'Капты' },
          { key: 'gang', label: 'Гангейм' },
        ]}
        active={activeTab}
        onChange={(key) => {
          setActiveTab(key as 'capts' | 'gang')
          if (key === 'gang' && !gangLoaded) setGangLoaded(true)
        }}
      />
      <div className={styles.pane}>
        {activeTab === 'capts' && (
          <>
            {matches.length > 0 && (
              <div className={styles.formChartBlock}>
                <FormStrip matches={matches} nick={nick} />
              </div>
            )}
            {matches.length > 0 ? (
              <div className={styles.matchesPanel}>
                {matches.map((m, i) => (
                  <div key={m.match_id || i} className={styles.matchRow}>
                    <div
                      className={`${styles.matchBadge} ${m.winner === nick || m.result === 'win' ? styles.matchWin : styles.matchLose}`}
                    >
                      {m.winner === nick || m.result === 'win' ? 'W' : 'L'}
                    </div>
                    <div className={styles.matchBody}>
                      <div className={styles.matchVs}>
                        <span>{m.family_name || m.family_2_name || '—'}</span>
                        <span className={styles.matchSep}>·</span>
                        <span style={{ color: '#888', fontSize: 11 }}>
                          {m.server_id || ''}
                        </span>
                      </div>
                      <div className={styles.matchChips}>
                        {m.kills != null && (
                          <span className={`${styles.chip} ${styles.chipNeu}`}>
                            {m.kills} K
                          </span>
                        )}
                        {m.damage != null && (
                          <span className={`${styles.chip} ${styles.chipNeu}`}>
                            {m.damage} DMG
                          </span>
                        )}
                        {m.rating_change != null && (
                          <span
                            className={`${styles.chip} ${m.rating_change >= 0 ? styles.chipWin : styles.chipLose}`}
                          >
                            {m.rating_change >= 0 ? '+' : ''}
                            {m.rating_change}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>Нет данных о матчах</div>
            )}
          </>
        )}
        {activeTab === 'gang' &&
          (gangLoaded ? (
            <GunGame nick={nick} server={server} />
          ) : (
            <div className={styles.emptyState}>
              Выберите вкладку для загрузки
            </div>
          ))}
      </div>
    </>
  )
}
