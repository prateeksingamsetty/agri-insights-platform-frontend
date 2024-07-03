import { useState } from 'react'
import Link from 'next/link'
import { FaUserCircle, FaHome, FaBars, FaTimes } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  const { loggedIn, signOut, username } = useAuth()

  // Toggle navigation menu
  const handleClick = () => setNav(!nav)

  return (
    <div className='z-10 flex h-[80px] w-full items-center justify-center bg-white px-4 shadow-md'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='space-x- mx-auto flex items-center justify-between'>
          {/* Home Icon */}
          <Link href='/'>
            <div className='flex cursor-pointer items-center justify-between space-x-2 text-xl font-semibold'>
              <FaHome className='text-red-600' />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className='hidden space-x-8 md:flex'>
            <li>
              <Link href='/about'>
                <div className='cursor-pointer justify-between text-gray-800 hover:text-red-600'>
                  About Us
                </div>
              </Link>
            </li>
            <li>
              <Link href='/enterprises'>
                <div className='cursor-pointer text-gray-800 hover:text-red-600'>
                  Enterprises
                </div>
              </Link>
            </li>
            <li>
              <Link href='/prices'>
                <div className='cursor-pointer text-gray-800 hover:text-red-600'>
                  Price Data
                </div>
              </Link>
            </li>
            <li>
              <Link href='/resources'>
                <div className='cursor-pointer text-gray-800 hover:text-red-600'>
                  Resources
                </div>
              </Link>
            </li>
            {!loggedIn && (
              <li>
                <Link href='/signup'>
                  <div className='cursor-pointer text-gray-800 hover:text-red-600'>
                    Sign Up
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link href={loggedIn ? '/' : '/signin'}>
                <div
                  className='cursor-pointer text-gray-800 hover:text-red-600'
                  onClick={loggedIn ? signOut : undefined}
                >
                  {loggedIn ? 'Sign Out' : 'Sign In'}
                </div>
              </Link>
            </li>
            {/* <li className='text-gray-800'>{username || 'Guest'}</li> */}
          </ul>
        </div>

        {/* Username Display */}
        <div className='hidden items-center space-x-4 md:flex'>
          {username && (
            <div className='flex items-center space-x-2 rounded-full bg-gray-200 p-2'>
              <FaUserCircle className='text-xl text-gray-700' />
              <span className='text-lg font-semibold text-gray-800'>
                {username}
              </span>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden'>
          <button onClick={handleClick}>
            {!nav ? (
              <FaBars className='text-gray-800' />
            ) : (
              <FaTimes className='text-gray-800' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`${!nav ? 'hidden' : 'flex'} absolute left-0 top-[80px] w-full flex-col space-y-4 bg-white p-4 shadow-md md:hidden`}
      >
        <li>
          <Link href='/about'>
            <div
              className='cursor-pointer text-gray-800 hover:text-red-600'
              onClick={handleClick}
            >
              About Us
            </div>
          </Link>
        </li>
        <li>
          <Link href='/enterprises'>
            <div
              className='cursor-pointer text-gray-800 hover:text-red-600'
              onClick={handleClick}
            >
              Enterprises
            </div>
          </Link>
        </li>
        <li>
          <Link href='/prices'>
            <div
              className='cursor-pointer text-gray-800 hover:text-red-600'
              onClick={handleClick}
            >
              Price Data
            </div>
          </Link>
        </li>
        <li>
          <Link href='/resources'>
            <div
              className='cursor-pointer text-gray-800 hover:text-red-600'
              onClick={handleClick}
            >
              Resources
            </div>
          </Link>
        </li>
        {!loggedIn && (
          <li>
            <Link href='/signup'>
              <div className='cursor-pointer text-gray-800 hover:text-red-600'>
                Sign Up
              </div>
            </Link>
          </li>
        )}
        <li>
          <Link href={loggedIn ? '/' : '/signin'}>
            <div
              className='cursor-pointer text-gray-800 hover:text-red-600'
              onClick={loggedIn ? signOut : undefined}
            >
              {loggedIn ? 'Sign Out' : 'Sign In'}
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
