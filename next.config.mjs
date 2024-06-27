/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'ichef.bbci.co.uk',
        'media.zenfs.com',
        'api.time.com',
        'media.wired.com',
        'another-allowed-domain.com',
        // Add all necessary domains here that your application will fetch images from
      ]
    }
  };
  
  export default nextConfig;
  