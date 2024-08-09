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
        <body className={`${inter.className} flex min-h-screen flex-col`}>
          <UtilityBar />
          <Navbar />
          <div className='flex flex-1 pt-[108px]'> {/* Adjusted padding-top */}
          <Sidebar />
            <main className='flex-1 p-4 ml-64'>
            
              {children}
             
            </main>
          </div>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  )
}