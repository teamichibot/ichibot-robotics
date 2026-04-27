import type { Metadata } from 'next'
import { Rajdhani, DM_Sans } from 'next/font/google'
import './globals.css'

const rajdhani = Rajdhani({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'Ichibot Robotics', template: '%s — Ichibot Robotics' },
  description: 'Robot kompetitif edukasi dari Yogyakarta — diekspor ke 17+ negara. Produk Line Follower, Sumo, Transporter, MyRIO beserta program pelatihan.',
  openGraph: {
    siteName: 'Ichibot Robotics',
    locale: 'id_ID',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${rajdhani.variable} ${dmSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
