import React from 'react';

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string; // Make className optional
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, width, height, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className} // Use className prop here
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default CustomImage;
