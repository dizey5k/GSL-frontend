'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styles from './Banner.module.scss'

interface Props {
  banners: any[]
}

export default function Banner({ banners }: Props) {
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  const total = banners.length

  const scrollTo = useCallback((index: number) => {
    const el = trackRef.current
    if (!el) return
    const idx = ((index % total) + total) % total
    el.scrollTo({ left: idx * el.clientWidth, behavior: 'smooth' })
    setCurrent(idx)
  }, [total])

  const goNext = useCallback(() => scrollTo(current + 1), [current, scrollTo])
  const goPrev = useCallback(() => scrollTo(current - 1), [current, scrollTo])

  // Sync dot index on manual scroll (drag or wheel)
  const handleScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== current) setCurrent(idx)
  }, [current])

  // Auto-play
  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      if (!isHovering.current) goNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [total, goNext])

  if (!banners || total === 0) {
    return <div className={styles.banner} />
  }

  return (
    <div
      className={styles.banner}
      onMouseEnter={() => { isHovering.current = true }}
      onMouseLeave={() => { isHovering.current = false }}
    >
      <div
        ref={trackRef}
        className={styles.track}
        onScroll={handleScroll}
      >
        {banners.map((banner, i) => (
          <div key={i} className={styles.slide}>
            {banner.link ? (
              <a href={banner.link} className={styles.link}>
                <Image
                  src={banner.image_url}
                  alt={banner.title || 'Баннер'}
                  width={800}
                  height={200}
                  unoptimized
                />
              </a>
            ) : (
              <Image
                src={banner.image_url}
                alt={banner.title || 'Баннер'}
                width={800}
                height={200}
                unoptimized
              />
            )}
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={goPrev}
            aria-label="Предыдущий"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={goNext}
            aria-label="Следующий"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div className={styles.dots}>
            {banners.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.active : ''}`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
