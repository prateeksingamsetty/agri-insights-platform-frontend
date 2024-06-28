import { useState } from "react";
import Link from "next/link";
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleClick = () => setNav(!nav);

  return (
    <div className="w-full h-[80px] z-10 bg-white shadow-md flex items-center justify-center px-4  ">
      <div className="container flex items-center justify-between mx-auto">
        {/* Centered Content */}
        <div className="flex items-center space-x- mx-auto justify-between">
          {/* Home Icon */}
          <Link href="/" legacyBehavior>
            <a className="text-xl font-semibold flex items-center justify-between space-x-2">
              <FaHome className="text-red-600" />
            </a>
          </Link>
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/about" legacyBehavior>
                <a className="text-gray-800 hover:text-red-600 justify-between">About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/enterprises" legacyBehavior>
                <a className="text-gray-800 hover:text-red-600">Enterprises</a>
              </Link>
            </li>
            <li>
              <Link href="/price-data" legacyBehavior>
                <a className="text-gray-800 hover:text-red-600">Price Data</a>
              </Link>
            </li>
            <li>
              <Link href="/resources" legacyBehavior>
                <a className="text-gray-800 hover:text-red-600">Resources</a>
              </Link>
            </li>
            <li>
              <Link href="/sign-in" legacyBehavior>
                <a className="text-gray-800 hover:text-red-600">Sign In</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={handleClick}>
            {!nav ? <FaBars className="text-gray-800" /> : <FaTimes className="text-gray-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul className={`${!nav ? 'hidden' : 'flex'} absolute top-[80px] left-0 w-full bg-white shadow-md flex-col space-y-4 p-4 md:hidden`}>
        <li>
          <Link href="/about" legacyBehavior>
            <a className="text-gray-800 hover:text-red-600" onClick={handleClick}>About Us</a>
          </Link>
        </li>
        <li>
          <Link href="/enterprises" legacyBehavior>
            <a className="text-gray-800 hover:text-red-600" onClick={handleClick}>Enterprises</a>
          </Link>
        </li>
        <li>
          <Link href="/price-data" legacyBehavior>
            <a className="text-gray-800 hover:text-red-600" onClick={handleClick}>Price Data</a>
          </Link>
        </li>
        <li>
          <Link href="/resources" legacyBehavior>
            <a className="text-gray-800 hover:text-red-600" onClick={handleClick}>Resources</a>
          </Link>
        </li>
        <li>
          <Link href="/sign-in" legacyBehavior>
            <a className="text-gray-800 hover:text-red-600" onClick={handleClick}>Sign In</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
