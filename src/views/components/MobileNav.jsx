import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import ModeToggle from "../../components/theme-toggle";

function MobileNav() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("/");

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuVisible]);

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("wglid");
      setIsMenuVisible(false);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/services" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="md:hidden z-[10001] relative flex items-center gap-4">
        <ModeToggle className="text-white hover:bg-white/10" />
        <div
          className="cursor-pointer transition-colors p-2 text-white hover:text-white/80"
          onClick={() => setIsMenuVisible((prev) => !prev)}
        >
          {!isMenuVisible ? (
            <GiHamburgerMenu className="h-6 w-6" />
          ) : (
            <ImCross className="h-6 w-6 fixed top-8 right-6" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuVisible && (
          <motion.nav
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 w-full h-screen bg-brand-primary dark:bg-brand-dark z-[10000] flex flex-col justify-center items-center md:hidden"
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>

            <ul className="flex flex-col items-center gap-8 mb-12 relative z-10">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.path}
                    className="text-3xl font-bold text-white hover:text-brand-icon transition-colors uppercase tracking-widest"
                    onClick={() => setIsMenuVisible(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-6 w-full max-w-xs px-6 relative z-10">
              {!path.includes("admin") && !path.includes("user") ? (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuVisible(false)}
                    className="w-full h-14 flex items-center justify-center rounded-xl border-2 border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white transition-all uppercase tracking-wider text-sm"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMenuVisible(false)}
                    className="w-full h-14 flex items-center justify-center rounded-xl bg-white dark:bg-brand-icon text-brand-primary dark:text-black font-bold hover:bg-white/90 dark:hover:bg-brand-icon/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all uppercase tracking-wider text-sm"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <button
                  onClick={logout}
                  className="w-full h-14 flex items-center justify-center rounded-xl bg-red-500/10 border border-red-500/50 text-red-500 font-bold hover:bg-red-500/20 transition-all uppercase tracking-wider text-sm"
                >
                  Sign Out
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

export default MobileNav;
