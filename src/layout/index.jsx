import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import emailjs from "@emailjs/browser";
import { ScrollRestoration } from "react-router-dom/dist";

function Layout() {
  emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

export default Layout;
