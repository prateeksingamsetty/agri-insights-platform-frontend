// import React from 'react'
// import Image from 'next/image'

// const Header: React.FC = () => {
//   return (
//     <header className='relative h-[400px] w-full'>
//       <Image
//         src='/banner.jpg'
//         alt='Farm background'
//         layout='fill'
//         objectFit='cover'
//         className='brightness-75'
//       />
//       <div className='absolute inset-0 flex items-center justify-start p-8'>
//         <div className='max-w-md bg-gray-800 bg-opacity-70 p-6'>
//           <h1 className='mb-4 text-3xl font-bold text-white'>
//             Welcome to the Farm Analytics! We&apos;re your agricultural
//             analytics advisory.
//           </h1>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Header
import React from 'react';
import Image from 'next/image';

interface HeaderProps {
  imageSrc: string;
  headingText: string;
  subText?: string;
}

const Header: React.FC<HeaderProps> = ({ imageSrc, headingText, subText }) => {
  return (
    <header className="relative h-[400px] w-full">
      <Image
        src={imageSrc}
        alt="Background image"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
      />
      <div className="absolute inset-0 flex items-center justify-start p-8">
        <div className="max-w-md bg-gray-800 bg-opacity-70 p-6">
          <h1 className="mb-4 text-3xl font-bold text-white">{headingText}</h1>
          {subText && <p className="text-white">{subText}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;

