'use client'

import Card from '../components/Card'
import '../styles/globals.css'
import AboutPlatform from '../components/AboutPlatform'
import Carousel from '../components/Carousel'
import Header from '@components/Header'

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <main className='container mx-auto px-4 py-6'>
        <AboutPlatform />

        <section className='mt-10'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <Card
              title='Enterprise'
              imageSrc='/enterprise.jpg'
              description='Enterprise data description'
            />
            <Card
              title='Dairy Models'
              imageSrc='/milkcan.jpg'
              description='Dairy models'
            />
            <Card
              title='Tomato model'
              imageSrc='/tomatocard.jpg'
              description='Stay updated with the latest tomato analytics model.'
            />
            {/* Add more cards as needed */}
          </div>
        </section>

        <section className='mt-10'>
          <Carousel />
        </section>
      </main>
    </div>
  )
}
