import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LakshyaAI - Career Clarity for India\'s Youth',
  description: 'LakshyaAI helps students discover, compare, and plan careers through real insight and AI-powered guidance – not random advice.',
  keywords: 'career guidance, career planning, career simulator, AI, India, youth, education, LakshyaAI',
  authors: [{ name: 'LakshyaAI Team' }],
  openGraph: {
    title: 'LakshyaAI - Career Clarity for India\'s Youth',
    description: 'LakshyaAI helps students discover, compare, and plan careers through real insight and AI-powered guidance – not random advice.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LakshyaAI - Career Clarity for India\'s Youth',
    description: 'LakshyaAI helps students discover, compare, and plan careers through real insight and AI-powered guidance – not random advice.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
