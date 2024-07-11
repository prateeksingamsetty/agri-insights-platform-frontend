import Image from 'next/image'

const UnderConstructionImage = () => {
  return (
    <div className='flex justify-center'>
      <Image
        src='/under_construction.png'
        alt='Page under construction'
        width={700}
        height={750}
        layout='intrinsic'
        className='mt-10 object-cover'
      />
    </div>
  )
}

export default UnderConstructionImage
