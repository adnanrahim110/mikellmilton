import ContactFormAlt from '@/components/contact/ContactFormAlt'
import ContactFormSection from '@/components/contact/ContactFormSection'
import SharedHero from '@/components/ui/SharedHero'
import React from 'react'

export default function page() {
  return (
    <>
      <SharedHero bgImage='/imgs/banners/hero-3.jpeg' />
      <ContactFormAlt />
    </>
  )
}
