import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import HeroSection from '@/components/sections/HeroSection'
import MissionVisionSection from '@/components/sections/MissionVisionSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import GallerySection from '@/components/sections/GallerySection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'

export default function SinglePage() {
  const location = useLocation()


  // Handle scroll state from navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [location.state])




  return (
    <>
      <HeroSection />
      <MissionVisionSection />
      <FeaturesSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
    </>
  )
}
