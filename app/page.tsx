'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import CareerToolsSection from '@/components/CareerToolsSection'
import CareerSimulatorPreview from '@/components/CareerSimulatorPreview'
import MentorsSection from '@/components/MentorsSection'
import AboutSection from '@/components/AboutSection'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <CareerToolsSection />
      <CareerSimulatorPreview />
      <MentorsSection />
      <AboutSection />
    </div>
  )
}
