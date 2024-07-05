import Link from 'next/link'
import React from 'react'

interface SidebarLinkProps {
  href: string
  children: React.ReactNode
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ href, children }) => {
  return (
    <li className='border-b border-red-800 last:border-b-0'>
      <Link
        href={href}
        className='flex items-center space-x-2 py-2 font-bold text-red-800 hover:text-red-600'
      >
        {children}
      </Link>
    </li>
  )
}

export default SidebarLink
