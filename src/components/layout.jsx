import Head from 'next/head'
import dynamic from 'next/dynamic';
import { useEffect } from "react";

// component imports
const Navbar = dynamic(() => import('@/components/NavBar'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Layout({children}) {
  useEffect(() => {
    const startSerer = async () => {
      await fetch('/api/events/controller')
      .then((res) => res.json());
      await fetch('/api/stores/controller')
      .then((res) => res.json());
    }

    startSerer()
  })
  return (
    <>
      {/* this is metadata stuff */}
      <Head>
        <title>
          hello im title
        </title>    
      </Head>

      {/* this is the main layout */}
      <Navbar />
        <main>{children}</main>
      <Footer />
    </>
  )
}
