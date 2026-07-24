import { Providers } from './providers'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

import '@/styles/_globals.scss'
import '@/styles/tailwind.css'
import { getMetadata } from './metadata'

export const metadata = getMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru-RU" className="dark">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
