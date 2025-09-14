import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TribalTrek - Discover Jharkhand',
  description: 'Experience the vibrant culture and breathtaking landscapes of Jharkhand with AI-powered tourism platform',
  generator: 'TribalTrek',
  icons: {
    icon: '/Full.ico',
    shortcut: '/Full.ico',
    apple: '/Full.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
