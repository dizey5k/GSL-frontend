'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  usePickemCampaigns,
  usePickemFeed,
  usePickemLeaderboard,
  usePickemMyStats,
} from '@/hooks'
import { PickemCampaign, PickemQuestion } from '@/types'
import { Spinner } from '@heroui/react'
import styles from './Pickem.module.scss'
import {
  CampaignHeader,
  DayTabs,
  Leaderboard,
  MyStats,
  QuestionList,
} from './components'

export default function PickemPage() {
  const searchParams = useSearchParams()
  const slug = searchParams.get('campaign') || undefined

  const {
    data: campaigns,
    isLoading: campaignsLoading,
    error: campaignsError,
  } = usePickemCampaigns()

  let selectedCampaign: PickemCampaign | null = null
  if (campaigns) {
    if (slug) {
      selectedCampaign =
        campaigns.find((c: PickemCampaign) => c.slug === slug) || null
    }
    if (!selectedCampaign) {
      selectedCampaign =
        campaigns.find((c: PickemCampaign) => c.status === 'published') || null
    }
  }

  const {
    data: feed,
    isLoading: feedLoading,
    refetch: refetchFeed,
  } = usePickemFeed(selectedCampaign?.slug || '')
  const { data: leaderboard, isLoading: lbLoading } = usePickemLeaderboard(
    selectedCampaign?.id || 0,
  )
  const { data: myStats, isLoading: myStatsLoading } = usePickemMyStats()

  const [activeDayKey, setActiveDayKey] = useState<string>('pre')

  useEffect(() => {
    if (feed?.day_tabs && feed.day_tabs.length > 0) {
      const firstKey = feed.day_tabs[0].key
      setActiveDayKey((prev) => {
        const exists = feed.day_tabs.some((t) => t.key === prev)
        return exists ? prev : firstKey
      })
    }
  }, [feed])

  if (campaignsLoading) {
    return (
      <div className={styles.loading}>
        <Spinner color="warning" size="lg" />
      </div>
    )
  }

  if (campaignsError || !campaigns || campaigns.length === 0) {
    return <div className={styles.empty}>Нет активных кампаний</div>
  }

  if (!selectedCampaign) {
    return <div className={styles.empty}>Кампания не найдена</div>
  }

  const currentDayTabs = feed?.day_tabs || []
  const currentTab = currentDayTabs.find((t) => t.key === activeDayKey)
  const currentPhase = currentTab?.phase || null
  const currentDayNumber = currentTab?.day_number ?? null

  let questionsForDay: PickemQuestion[] = []
  if (feed?.questions) {
    questionsForDay = feed.questions.filter((q) => {
      if (currentPhase && q.phase !== currentPhase) return false
      if (currentDayNumber !== null && q.day_number !== currentDayNumber)
        return false
      return true
    })
  }

  return (
    <div className={styles.container}>
      <CampaignHeader campaign={selectedCampaign} />
      <DayTabs
        tabs={currentDayTabs}
        activeKey={activeDayKey}
        onTabChange={setActiveDayKey}
      />
      <div className={styles.grid}>
        <div className={styles.main}>
          <QuestionList
            questions={questionsForDay}
            campaignId={selectedCampaign.id}
            loading={feedLoading}
            onPickSubmitted={refetchFeed}
          />
        </div>
        <div className={styles.sidebar}>
          <MyStats stats={myStats} loading={myStatsLoading} />
          <Leaderboard entries={leaderboard || []} loading={lbLoading} />
        </div>
      </div>
    </div>
  )
}
