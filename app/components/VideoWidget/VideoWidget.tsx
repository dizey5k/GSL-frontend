'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLiveStreams, useHomeVideos } from '@/hooks'
import styles from './VideoWidget.module.scss'

export default function VideoWidget() {
  const [activeTab, setActiveTab] = useState<'streams' | 'videos'>('streams')
  const { data: streams, isLoading: streamsLoading } = useLiveStreams()
  const { data: videos, isLoading: videosLoading } = useHomeVideos()

  const isLoading = activeTab === 'streams' ? streamsLoading : videosLoading
  const items = activeTab === 'streams' ? streams : videos

  return (
    <div className={styles.widget}>
      <div className={styles.head}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'streams' ? styles.active : ''}`}
            onClick={() => setActiveTab('streams')}
          >
            Стримы
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'videos' ? styles.active : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Видео
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {isLoading && <div className={styles.loading}>Загрузка...</div>}
        {!isLoading && items?.length === 0 && (
          <div className={styles.empty}>Нет записей</div>
        )}
        {!isLoading && items?.length > 0 && (
          <div className={styles.list}>
            {items.slice(0, 6).map((item: any) => {
              const isStream = activeTab === 'streams'
              const title = isStream
                ? item.stream_title || item.title
                : item.title
              const author = isStream
                ? item.player_nickname || item.author
                : item.author
              const url = isStream ? item.stream_url : item.youtube_url
              const thumbnail = isStream
                ? item.thumbnail_url
                : item.thumbnail_url || item.image_url

              return (
                <div key={item.id} className={styles.card}>
                  {thumbnail && (
                    <Image
                      src={thumbnail}
                      alt={title || 'Превью'}
                      width={72}
                      height={48}
                      className={styles.thumbnail}
                      unoptimized
                    />
                  )}
                  <div className={styles.info}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.author}>{author}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <a href="/live">Смотреть стримы</a>
      </div>
    </div>
  )
}
