import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import SecurityProvider from '@/components/SecurityProvider'
import Navbar from '@/components/Navbar'
import ConditionalFooter from '@/components/ConditionalFooter'

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
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="robots" content="noindex, nofollow" />
        </head>
        <body className={`${inter.className} bg-gradient-to-br from-primary-50 via-accent-50 to-primary-100 text-text-primary min-h-screen`}>
          <SecurityProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <ConditionalFooter />
          </SecurityProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
