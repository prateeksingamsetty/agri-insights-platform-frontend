
"use client";
import { Inter } from "next/font/google";
import Navbar from '../components/Navigation';
import Footer from '../components/Footer';
import UtilityBar from '../components/UtilityBar';

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UtilityBar/> 
      <Navbar />
        <main className="relative overflow-hidden">
          {children}
        </main>
        <Footer />
        
        </body>
    </html>
  );
}
