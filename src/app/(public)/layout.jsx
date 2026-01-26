"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import PageLoader from "@/views/components/PageLoader";
import { AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function PublicLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(!pathname.startsWith("/admin"));

  useEffect(() => {
    // Initialize EmailJS here or in providers
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY });
    }

    if (pathname.startsWith("/admin")) {
      setLoading(false);
      return;
    }

    // Simulate initial loading sequence
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

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
          <main className="min-h-screen">{children}</main>
          <Footer />
        </>
      )}
    </>
  );
}
