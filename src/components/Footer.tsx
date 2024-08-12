import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube
} from '@mui/icons-material'

export default function Footer() {
  return (
    <footer className='relative z-30 bg-red-900 py-8 text-white'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-3 gap-8'>
          {/* Left Column */}
          <div>
            <h2 className='mb-2 text-3xl font-bold text-white'>NC STATE</h2>
            <h3 className='mb-4 text-xl text-white'>
              Agricultural and Resource Economics
            </h3>
            <address className='not-italic'>
              Nelson Hall
              <br />
              Campus Box 8109
              <br />
              2801 Founders Drive
              <br />
              Raleigh, NC 27695
            </address>
            <p className='mt-4'>
              <Link href='#' className='underline'>
                NC State is an equal opportunity institution.
              </Link>
            </p>
          </div>

          {/* Middle Column */}
          <div>
            <nav>
              <ul className='space-y-2'>
                <li>
                  <Link href='#' className='hover:underline'>
                    Subscribe to ARE Newsletter
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Subscribe to NC State Economist
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Department Directory
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Faculty and Staff Resources
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    News
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Accessibility
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Diversity
                  </Link>
                </li>
                <li>
                  <Link href='#' className='hover:underline'>
                    Employee Login
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Right Column */}
          <div>
            <h4 className='mb-4 text-lg font-bold text-white'>CAMPUS MAP </h4>
            <div className='mb-6'>
              <Image src='/map.jpg' alt='Campus Map' width={300} height={200} />
            </div>
            <h4 className='mb-4 text-lg font-bold text-white'>
              CONNECT WITH US
            </h4>
            <div className='flex space-x-4'>
              <Link href='#'>
                <Facebook />
              </Link>
              <Link href='#'>
                <Twitter />
              </Link>
              <Link href='#'>
                <LinkedIn />
              </Link>
              <Link href='#'>
                <Instagram />
              </Link>
              <Link href='#'>
                <YouTube />
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-8 text-center'>
          <p>&copy; 2024 NC State University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
