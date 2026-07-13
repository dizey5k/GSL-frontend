'use client'

import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import styles from './GenericTable.module.scss'
import { TableProps } from './types'

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

  if (loading && data.length === 0) {
    return <div className={styles.loading}>Загрузка...</div>
  }

  if (error) {
    return (
      <div className={styles.error}>{error.message || 'Ошибка загрузки'}</div>
    )
  }

  if (data.length === 0) {
    return <div className={styles.empty}>{emptyText}</div>
  }

  return (
    <div className={`${styles.tableWrapper} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={col.className}
                style={{ width: col.width }}
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
                : rowClassName || ''

            // custom render
            if (renderRow) {
              return (
                <tr
                  key={rowKey}
                  className={`${styles.row} ${rowClass}`}
                  onClick={() => onRowClick?.(item)}
                >
                  <td colSpan={columns.length}>{renderRow(item, index)}</td>
                </tr>
              )
            }

            return (
              <tr
                key={rowKey}
                className={`${styles.row} ${rowClass}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={col.className}>
                    {col.render
                      ? col.render(item, index)
                      : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      {loadMore && hasMore && (
        <div ref={ref} className={styles.loadMoreTrigger}>
          {isFetchingMore && <span>Загрузка...</span>}
        </div>
      )}
    </div>
  )
}
