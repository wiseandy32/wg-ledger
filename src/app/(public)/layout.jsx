"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
