'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Banner.module.scss'

interface Props {
  banners: any[]
}

export default function Banner({ banners }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  if (!banners || banners.length === 0) {
    return <div className={styles.banner} />
  }

  const banner = banners[current]

  return (
    <div className={styles.banner}>
      {banner.image_url && (
        <Image
          src={banner.image_url}
          alt={banner.title || 'Баннер'}
          width={800}
          height={200}
          className={styles.image}
          unoptimized
        />
      )}
      {banner.title && <div className={styles.title}>{banner.title}</div>}
      {banners.length > 1 && (
        <div className={styles.dots}>
          {banners.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === current ? styles.active : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
