import { Toaster } from 'sonner'
import { Providers } from './providers'
import Header from '@/components/layout/Header/Header'
import Footer from '@/components/layout/Footer/Footer'

import '@/styles/_globals.scss'

export default function RootLayout({ children }) {
  return (
    <html lang="ru-RU">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </Providers>
      </body>
    </html>
  )
}
