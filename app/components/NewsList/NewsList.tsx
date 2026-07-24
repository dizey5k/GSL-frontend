'use client'

import { useState } from 'react'
import { useHomeNews } from '@/hooks'
import { Skeleton } from '@heroui/react'
import styles from './NewsList.module.scss'
import Image from 'next/image'

const SOURCES = [
  { key: 'all', label: 'Все' },
  { key: 'gsl', label: 'GSL' },
  { key: 'majestic', label: 'Majestic' },
]

function NewsSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}>
        <Skeleton className="w-full h-full" />
      </div>
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonHeader}>
          <Skeleton className={styles.skeletonSource} />
          <Skeleton className={styles.skeletonDate} />
        </div>
        <Skeleton className={styles.skeletonTitle} />
        <Skeleton className={styles.skeletonContent} />
        <Skeleton className={styles.skeletonContent} />
      </div>
    </div>
  )
}

interface Props {
  initialNews: any[]
}

export default function NewsList({ initialNews }: Props) {
  const [source, setSource] = useState<'all' | 'gsl' | 'majestic'>('all')
  const { data, isLoading } = useHomeNews(source)

  const news = data && data.length > 0 ? data : initialNews

  const displayNews = isLoading && initialNews.length > 0 ? initialNews : news

  return (
    <div className={styles.news}>
      <div className={styles.head}>
        <h2 className={styles.title}>Последние новости</h2>
        <p className={styles.subtitle}>GSL и Majestic RP</p>
        <div className={styles.sourceTabs}>
          {SOURCES.map((s) => (
            <button
              key={s.key}
              className={`${styles.sourceTab} ${source === s.key ? styles.active : ''}`}
              onClick={() => setSource(s.key as any)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.list}>
        {isLoading && !initialNews.length && (
          <div className={styles.skeletons}>
            {Array.from({ length: 4 }).map((_, i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        )}
        {!isLoading && displayNews?.length === 0 && (
          <div className={styles.empty}>Новостей нет</div>
        )}
        {displayNews?.slice(0, 8).map((item: any) => (
          <div key={item.id} className={styles.card}>
            {item.image_url && (
              <Image
                src={item.image_url}
                alt={item.title}
                width={80}
                height={56}
                className={styles.image}
                unoptimized
              />
            )}
            <div className={styles.body}>
              <div className={styles.header}>
                <span className={styles.source}>{item.source || 'GSL'}</span>
                <span className={styles.date}>
                  {item.published_at || item.created_at
                    ? new Date(
                        item.published_at || item.created_at,
                      ).toLocaleDateString('ru-RU')
                    : ''}
                </span>
              </div>
              <a href={item.link_url || '#'} className={styles.titleLink}>
                {item.title}
              </a>
              {item.content && (
                <div className={styles.content}>{item.content}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
