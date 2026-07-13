import { ReactNode } from 'react'

export interface Column<T> {
  key: string
  header: string | ReactNode
  render?: (item: T, index: number) => ReactNode
  className?: string
  sortable?: boolean
  width?: string | number
}

export interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (item: T) => string | number
  onRowClick?: (item: T) => void
  loading?: boolean
  emptyText?: string
  error?: Error | null
  loadMore?: () => void
  hasMore?: boolean
  isFetchingMore?: boolean
  className?: string
  rowClassName?: string | ((item: T) => string)
  renderRow?: (item: T, index: number) => ReactNode
}
