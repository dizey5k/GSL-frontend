'use client'

import { GenericTable } from '@/components/ui/Table'
import { TierListItem } from '../types'
import TierListRow from '../TierListRow/TierListRow'
import styles from './TierListTable.module.scss'

interface Props {
  data: TierListItem[]
  loading: boolean
  error: Error | null
  hasMore: boolean
  fetchMore: () => void
  isFetchingMore: boolean
  onRowClick?: (item: TierListItem) => void
}

export default function TierListTable({
  data,
  loading,
  error,
  hasMore,
  fetchMore,
  isFetchingMore,
  onRowClick,
}: Props) {
  const columns = [
    {
      key: 'row',
      header: '',
      render: (item: TierListItem) => (
        <TierListRow item={item} onClick={onRowClick} />
      ),
    },
  ]

  return (
    <GenericTable
      columns={columns}
      data={data}
      keyExtractor={(item) => item.id}
      onRowClick={onRowClick}
      loading={loading}
      error={error}
      emptyText="Ничего не найдено"
      loadMore={fetchMore}
      hasMore={hasMore}
      isFetchingMore={isFetchingMore}
      rowClassName={(item) => {
        const tier =
          item.rank <= 3
            ? 'tier1'
            : item.rank <= 9
              ? 'tier2'
              : item.rank <= 15
                ? 'tier3'
                : 'tier4'
        return styles[tier] || ''
      }}
    />
  )
}
