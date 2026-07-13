'use client'

import { useFiltersStore, useUIStore } from '@/store'
import TierListHeader from '../TierListHeader/TierListHeader'
import TierListToolbar from '../TierListToolbar/TierListToolbar'
import TierListPodium from '../TierListPodium/TierListPodium'
import TierListTable from '../TierListTable/TierListTable'
import { TierListItem } from '../types'
import styles from './TierListPage.module.scss'
import { useTierList } from '@/hooks'

interface Props {
  type: 'players' | 'families'
  title: string
  description: string
  mapDataToItem: (item: any, index: number) => TierListItem
  getModalData?: (item: TierListItem) => { nick?: string; name?: string }
}

export default function TierListPage({
  type,
  title,
  description,
  mapDataToItem,
  getModalData,
}: Props) {
  const { playerServer, playerSort } = useFiltersStore()
  const { openModal } = useUIStore()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useTierList(type, {
    server: playerServer || undefined,
    order_by: playerSort,
  })

  const allItems = data?.pages.flatMap((page) => page.data) || []
  const total = data?.pages[0]?.total || 0

  const tierItems: TierListItem[] = allItems.map((item, index) =>
    mapDataToItem(item, index),
  )
  const top3 = tierItems.slice(0, 3)

  const handleRowClick = (item: TierListItem) => {
    const modalData = getModalData?.(item) || { nick: item.name }
    if (modalData.nick || modalData.name) {
      openModal(type === 'players' ? 'player' : 'family', modalData)
    }
  }

  return (
    <div className={styles.container}>
      <TierListHeader title={title} description={description} type={type} />
      <TierListToolbar type={type} />
      <TierListPodium items={top3} total={total} onClick={handleRowClick} />
      <TierListTable
        data={tierItems}
        loading={isLoading}
        error={error as Error}
        hasMore={hasNextPage}
        fetchMore={fetchNextPage}
        isFetchingMore={isFetchingNextPage}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
