"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function PublicLayout({ children }) {
  useEffect(() => {
    // Initialize EmailJS here or in providers
    if (process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
      emailjs.init({ publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY });
    }
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
