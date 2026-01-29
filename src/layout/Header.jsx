import Link from "next/link";
import MobileNav from "../views/components/MobileNav";
import { useState, useEffect } from "react";
import ModeToggle from "../components/theme-toggle";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();
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
            ? "bg-brand-primary/95 dark:bg-background/95 backdrop-blur-md shadow-lg shadow-black/20 py-4"
            : "bg-brand-primary/95 dark:bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              width={160}
              height={40}
              alt="World Global Ledger"
              className={`${
                scrolled ? "brightness-0 invert" : "brightness-0 invert"
              } group-hover:opacity-80 transition-all duration-300`}
            />
          </Link>

          <MobileNav />

          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {[
                { title: "Home", path: "/" },
                { title: "Services", path: "/services" },
                { title: "About", path: "/about" },
                { title: "Contact", path: "/contact" },
              ].map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.title}>
                    <Link
                      href={link.path}
                      className={`text-sm font-medium transition-colors uppercase tracking-wider ${
                        isActive
                          ? "text-white font-bold"
                          : "text-white/80 hover:text-white"
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {!path.includes("admin") && !path.includes("user") && (
              <div className="flex items-center gap-4 ml-8 pl-8 border-l border-brand-dark-lighter/50">
                <ModeToggle className="text-white hover:bg-white/10" />
                <Link
                  href="/auth/login"
                  className="text-white hover:text-white/80 font-semibold text-sm transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-5 py-2.5 rounded-lg bg-white dark:bg-brand-icon text-brand-primary dark:text-black font-bold text-sm hover:bg-white/90 dark:hover:bg-brand-icon/90 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transform hover:-translate-y-0.5"
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
