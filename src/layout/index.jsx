import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import { ScrollRestoration } from "react-router-dom/dist";
import { useState, useEffect } from "react";
import PageLoader from "../pages/components/PageLoader";
import { AnimatePresence } from "framer-motion";

function Layout() {
  emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader
            key="loader"
            subtext="Establishing secure terminal connection..."
          />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <Header />
          <main className="overflow-x-hidden min-h-screen">
            <ScrollRestoration />
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
