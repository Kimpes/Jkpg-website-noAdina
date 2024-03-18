import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect } from "react";

// component imports
const Navbar = dynamic(() => import("@/components/NavBar"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Layout({ children }) {
  useEffect(() => {
    const startServer = async () => {
      await fetch("/api/events/controller").then((res) => res.json());
      await fetch("/api/stores/controller").then((res) => res.json());
    };

    startServer();
  });
  return (
    <>
      {/* this is metadata stuff */}
      <Head>
        <title>JKPG City</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* this is the main layout */}
      <div className="page-layout">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}
