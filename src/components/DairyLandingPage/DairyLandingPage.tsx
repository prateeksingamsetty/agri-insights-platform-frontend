import React from 'react'
import Image from 'next/image'
import Header from '@components/Header'

const DairyLandingPage: React.FC = () => {
  return (
    <div className='dairy-landing-page'>
      {/* Hero Section */}
      <Header
        imageSrc='/dairybanner.jpg'
        headingText='Empower Your Dairy. Unlock Insights, Drive Profitability.'
        subText='Providing comprehensive insights and solutions for your dairy needs.'
      />

      {/* Content Sections */}
      <div className='mx-auto max-w-6xl rounded-lg bg-gray-100 p-12 shadow-lg'>
        <Section
          title='Enterprise Budget Model'
          description={`Craft a data-driven roadmap for your dairy's success. Our Enterprise Budget Model empowers you to forecast costs, project revenue, and identify areas for optimization. Gain valuable insights into your operation's financial health and make informed decisions that maximize profitability.`}
          buttonText='Enterprise Budget'
          imageSrc='/enterprise.jpg'
          href='/dairyEnterprise'
        />

        <Section
          title='Feed Composition and Source'
          description={`Unlock the secrets to optimal milk production. Our Feed Composition and Source section explores the science behind effective dairy nutrition. Discover the best feed combinations to ensure your cows receive the essential nutrients they need for peak performance. Explore diverse feed sources and their unique benefits, while optimizing costs and promoting animal welfare.`}
          buttonText='Feed Composition'
          imageSrc='/milkcan.jpg'
          href='/dsairyFeedModel'
        />

        <Section
          title='Green House Gas Model'
          description={`Reduce your environmental impact and become a leader in sustainable dairy farming. The Green House Gas Model empowers you to analyze your farm's carbon footprint and implement eco-friendly strategies. Gain insights into emission sources and discover actionable steps to minimize your environmental impact. Become a responsible dairy farmer and contribute to a greener future.`}
          buttonText='Green House Gas'
          imageSrc='/greenhouse.jpg'
          href='/dairy'
        />

        <Section
          title='Disaster Feasibility'
          description={`Be prepared for anything. The Disaster Feasibility section equips you with the tools to assess your dairy's resilience in the face of unforeseen events. Identify potential risks and develop contingency plans to ensure the continued operation and well-being of your farm, livestock, and staff. Mitigate risks and navigate challenges with confidence.`}
          buttonText='Disaster Feasibility'
          imageSrc='/disaster.jpg'
          href='/dairy'
        />

        <Section
          title='Price Data'
          description={`Stay ahead of the market curve. Our Price Data section keeps you informed with the latest trends and fluctuations in dairy product pricing. Make informed decisions about production, inventory management, and sales based on real-time market data. Never miss an opportunity to maximize your profits and navigate market fluctuations with ease.`}
          buttonText='Price Data'
          imageSrc='/price.jpg'
          href='/prices/dairy'
        />

        {/* <Section
          title='Resources'
          description={`Empower yourself with knowledge. Our comprehensive Resources section equips you with a wealth of valuable information to support your dairy farming success. Access best practices, industry news, expert insights, and educational resources – all curated to equip you with the knowledge and tools you need to thrive in the dynamic dairy industry.`}
          buttonText='Resources'
          imageSrc='/resources.jpg'
          href='/dairy'
        /> */}
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  description: string
  buttonText: string
  imageSrc: string
  href: string
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  buttonText,
  imageSrc,
  href
}) => {
  return (
    <div className='mb-12'>
      <h2 className='mb-4 text-4xl font-bold text-red-600'>{title}</h2>
      <p className='mb-6 text-lg leading-relaxed text-gray-700'>
        {description}
      </p>
      <div className='relative m-2 h-48 w-64 overflow-hidden'>
        <Image
          src={imageSrc}
          alt={buttonText}
          layout='fill'
          objectFit='cover'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-red-600 px-3 py-2 text-white transition duration-300 ease-in-out hover:bg-red-700'>
          <a href={href} className='block text-center text-xl font-bold'>
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  )
}

export default DairyLandingPage
