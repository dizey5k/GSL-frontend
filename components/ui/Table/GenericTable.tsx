'use client'

import { useEffect } from 'react'
import { Skeleton, Spinner } from '@heroui/react'
import { useInView } from 'react-intersection-observer'
import { TableProps } from './types'
import styles from './GenericTable.module.scss'

export function GenericTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  loading = false,
  emptyText = 'Нет данных',
  error = null,
  loadMore,
  hasMore = false,
  isFetchingMore = false,
  className = '',
  rowClassName,
  renderRow,
}: TableProps<T>) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasMore && !isFetchingMore && loadMore) {
      loadMore()
    }
  }, [inView, hasMore, isFetchingMore, loadMore])

  if (error) {
    return (
      <div className={styles.error}>{error.message || 'Ошибка загрузки'}</div>
    )
  }

  if (!loading && data.length === 0) {
    return <div className={styles.empty}>{emptyText}</div>
  }

  if (loading && data.length === 0) {
    return (
      <div className={`${styles.skeletonCard} ${className}`}>
        <table className={styles.skeletonTable}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={styles.skeletonHeaderCell}>
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index} className={styles.skeletonRow}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.skeletonCell}>
                    <Skeleton className="h-5 w-full rounded-lg" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${styles.tableHeaderCell} ${col.className ?? ''}`}
                style={
                  col.width
                    ? {
                        width:
                          typeof col.width === 'number'
                            ? `${col.width}px`
                            : col.width,
                      }
                    : undefined
                }
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            const rowKey = keyExtractor(item)

            const rowClass =
              typeof rowClassName === 'function'
                ? rowClassName(item)
                : (rowClassName ?? '')

            if (renderRow) {
              return (
                <tr
                  key={rowKey}
                  className={`${styles.tableRow} ${rowClass} ${
                    onRowClick ? styles.clickable : ''
                  }`}
                  onClick={() => onRowClick?.(item)}
                >
                  <td className={styles.tableCell} colSpan={columns.length}>
                    {renderRow(item, index)}
                  </td>
                </tr>
              )
            }

            return (
              <tr
                key={rowKey}
                className={`${styles.tableRow} ${rowClass} ${
                  onRowClick ? styles.clickable : ''
                }`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => {
                  const value = col.render
                    ? col.render(item, index)
                    : String(
                        Reflect.get(item as object, col.key as PropertyKey) ??
                          '',
                      )

                  return (
                    <td
                      key={String(col.key)}
                      className={`${styles.tableCell} ${col.className ?? ''}`}
                    >
                      {value}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {loadMore && hasMore && (
        <div ref={ref} className={styles.loadMoreTrigger}>
          {isFetchingMore && <Spinner size="sm" color="warning" />}
        </div>
      )}
    </div>
  )
}
