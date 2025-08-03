'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function ConditionalFooter() {
  const pathname = usePathname()
  
  // Hide footer on dashboard pages
  const hiddenRoutes = [
    '/dashboard',
    '/mentor/dashboard',
    '/admin',
    '/onboarding'
  ]
  
  const shouldHideFooter = hiddenRoutes.some(route => pathname.startsWith(route))
  
  if (shouldHideFooter) {
    return null
  }
  
  return <Footer />
}
