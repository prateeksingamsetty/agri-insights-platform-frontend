import React from 'react'
import Image from 'next/image'

const AboutPlatform: React.FC = () => {
  return (
    <div className='mx-auto max-w-6xl rounded-lg bg-gray-100 p-12 shadow-lg'>
      <h2 className='mb-6 text-3xl font-bold text-gray-800'>
        About This Platform
      </h2>
      <div className='space-y-12'>
        <div className='flex flex-col items-center gap-8 md:flex-row'>
          <div className='space-y-4 text-gray-700 md:w-1/2'>
            <p>
              This platform is designed to serve as a library of agricultural
              enterprise models held in one place. Currently there are two
              commodities on the platform, dairy and tomatoes.
            </p>
            <p>
              The dairy model provides a basic enterprise budget, a feed
              component and source tool, a greenhouse gas emissions calculator,
              and a methane digester feasibility report.
            </p>
          </div>
          <div className='md:w-1/2'>
            <div className='overflow-hidden rounded-lg shadow-md'>
              <Image
                src='/cow.png'
                alt='Dairy cows in a field'
                width={400}
                height={250}
                layout='intrinsic'
                className='object-cover'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center gap-8 md:flex-row'>
          <div className='order-2 md:order-1 md:w-1/2'>
            <div className='overflow-hidden rounded-lg shadow-md'>
              <Image
                src='/tomato.png'
                alt='Tomatoes on the vine'
                width={400}
                height={250}
                layout='intrinsic'
                className='object-cover'
              />
            </div>
          </div>
          <div className='order-1 space-y-4 text-gray-700 md:order-2 md:w-1/2'>
            <p>
              The tomato model provides a basic enterprise budget and a weather
              dependent disease damage management model.
            </p>
            <p>
              Both commodities have relevant price data that is from the most
              recently available reports, citations for calculations, and
              additional resources that could provide the user with useful
              background.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPlatform
