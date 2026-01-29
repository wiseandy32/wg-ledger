import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ScrollRestoration } from "react-router-dom/dist";

function Layout() {
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
