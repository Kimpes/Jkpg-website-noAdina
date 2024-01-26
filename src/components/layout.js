import Head from 'next/head'
import dynamic from 'next/dynamic';

// component imports
const Navbar = dynamic(() => import('@/components/NavBar'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Layout({children}) {
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
