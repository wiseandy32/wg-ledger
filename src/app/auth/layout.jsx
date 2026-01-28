"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { useState, useEffect } from "react";
import PageLoader from "@/views/components/PageLoader";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <PageLoader
            key="loader"
            subtext="Establishing secure connection..."
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
