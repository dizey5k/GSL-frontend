'use client'

import styles from './Home.module.scss'
import TopRankingsBar from './components/TopRankingsBar/TopRankingsBar'
import SidebarWidget from './components/SidebarWidget/SidebarWidget'
import VideoWidget from './components/VideoWidget/VideoWidget'
import Banner from './components/Banner/Banner'
import NewsList from './components/NewsList/NewsList'
import { FamilyModal, PlayerModal } from '@/components'

interface Props {
  initialFamilies: any[]
  initialPlayers: any[]
  initialNews: any[]
  initialBanners: any[]
}

export default function HomePageClient({
  initialFamilies,
  initialPlayers,
  initialNews,
  initialBanners,
}: Props) {
  return (
    <div className={styles.homePage}>
      <TopRankingsBar families={initialFamilies} players={initialPlayers} />

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <SidebarWidget families={initialFamilies} players={initialPlayers} />
          <VideoWidget />
        </aside>

        <main className={styles.main}>
          <Banner banners={initialBanners} />
          <NewsList initialNews={initialNews} />
        </main>
      </div>

      <PlayerModal />
      <FamilyModal />
    </div>
  )
}
