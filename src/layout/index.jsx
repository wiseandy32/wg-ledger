import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import { ScrollRestoration } from "react-router-dom/dist";
import { useState, useEffect } from "react";

function Layout() {
  emailjs.init({ publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY });

  return (
    <>
      <Header />
      <main className="overflow-x-hidden min-h-screen">
        <ScrollRestoration />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
