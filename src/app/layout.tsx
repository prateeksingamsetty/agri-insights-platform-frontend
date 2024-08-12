'use client'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navigation'
import Footer from '../components/Footer'
import UtilityBar from '../components/UtilityBar'
import '@styles/globals.css'
import { AuthProvider } from 'src/context/AuthContext'
import Sidebar from '@components/Sidebar/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={`${inter.className} flex min-h-full flex-col`}>
          <UtilityBar />
          <Navbar />
          {/* <div className='flex flex-1 pt-[108px]'>
            <Sidebar />
            <main className='ml-64 flex-1 p-4'>{children}</main>
          </div> */}
          <div className='mt-20 flex h-full flex-1 p-2'>
            <div className='sticky top-0 h-full w-64 overflow-y-auto bg-white'>
              <Sidebar />
            </div>
            <main className='flex-1 overflow-y-auto p-4'>{children}</main>
          </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}
