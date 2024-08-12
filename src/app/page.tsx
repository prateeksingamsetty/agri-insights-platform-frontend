'use client'

import Card from '../components/Card'
import '../styles/globals.css'
import AboutPlatform from '../components/AboutPlatform'
import Carousel from '../components/Carousel'
import Header from '@components/Header'

export default function HomePage() {
  console.log('I am always rendered')
  return (
    <div className='min-h-screen bg-gray-100'>
      <Header
        imageSrc='/banner.jpg'
        headingText='Welcome to Agricultural Enterprise Analytics. Model your ag enterprise with us!'
        subText='Providing comprehensive insights and solutions for your farming needs.'
      />
      <main className='container mx-auto px-4 py-6'>
        <AboutPlatform />

        <section className='mt-10'>
          <div
            className='grid gap-6 px-16'
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
            }}
          >
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
