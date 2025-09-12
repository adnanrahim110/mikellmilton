import ContactFormAlt from '@/components/contact/ContactFormAlt'
import ContactFormSection from '@/components/contact/ContactFormSection'
import SharedHero from '@/components/ui/SharedHero'
import React from 'react'

export default function page() {
  return (
    <>
      <SharedHero eyebrow='Contact Me' title='Share the vision. Join the Breakthrough.' description='This is more than a message it is a movement. The Dope Breakthrough – Divining Our Perfect Eternity is not just written to be read, but to be shared, lived, and carried forward. Every voice matters, every question has value, and every connection builds the greater vision.' bgImage='/imgs/banners/hero-3.jpeg' />
      <ContactFormAlt />
    </>
  )
}
