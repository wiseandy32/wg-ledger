"use client";

import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { useState, useEffect } from "react";

export default function AuthLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
