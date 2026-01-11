import { Link, useLocation } from "react-router-dom";
import MobileNav from "../pages/components/MobileNav";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";

function Header() {
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/80 backdrop-blur-md shadow-lg shadow-brand-primary/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to={"/"} className="flex items-center gap-2 group">
            <img
              src={logo}
              width={160}
              height={40}
              alt="World Global Ledger"
              className="brightness-0 invert group-hover:opacity-80 transition-opacity"
            />
          </Link>

          <MobileNav />

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {[
                { title: "Home", path: "/" },
                { title: "Services", path: "/#services" },
                { title: "About", path: "/about" },
                { title: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.title}>
                  <Link
                    to={link.path}
                    className="text-brand-text-muted hover:text-brand-primary font-medium text-sm transition-colors uppercase tracking-wider"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            {!path.includes("admin") && !path.includes("user") && (
              <div className="flex items-center gap-4 ml-8 pl-8 border-l border-brand-dark-lighter/50">
                <Link
                  to="/login"
                  className="text-white hover:text-brand-primary font-semibold text-sm transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-lg bg-brand-primary text-brand-dark font-bold text-sm hover:bg-brand-primary/90 transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
