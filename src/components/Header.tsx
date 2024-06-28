import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="relative h-[400px] w-full">
      <Image
        src="/banner.jpg"
        alt="Farm background"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-start p-8">
        <div className="bg-gray-800 bg-opacity-70 p-6 max-w-md">
          <h1 className="text-white text-3xl font-bold mb-4">
            Welcome to the Farm Analytics! We&apos;re your agricultural analytics advisory.
          </h1>
          <button className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300">
            Meet our team
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;