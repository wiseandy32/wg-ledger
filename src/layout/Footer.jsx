import { Link } from "react-router-dom";
import Slide from "../pages/components/Slide";
import logo from "../assets/logo.png";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-slate-100 dark:bg-brand-dark border-t border-gray-200 dark:border-brand-dark-lighter/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Slide yAxis={20}>
              <img
                src={logo}
                width={180}
                height={45}
                alt="World Global Ledger"
                className="dark:brightness-0 dark:invert mb-4"
              />
              <p className="text-gray-600 dark:text-brand-text-muted leading-relaxed text-sm">
                Join the financial revolution. We are redefining banking by
                eliminating intermediaries and giving you complete control over
                your assets.
              </p>
              <div className="flex items-center gap-4 mt-6">
                {[FaTwitter, FaLinkedin, FaFacebook, FaInstagram].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-10 h-10 rounded-full bg-white dark:bg-brand-dark-lighter/50 flex items-center justify-center text-gray-600 dark:text-brand-text-muted hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <Icon size={18} />
                    </a>
                  )
                )}
              </div>
            </Slide>
          </div>

          {/* Column 2: Company */}
          <div>
            <Slide yAxis={20} delay={0.1}>
              <h3 className="text-brand-dark dark:text-white font-bold text-lg mb-6 tracking-wide">
                Company
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Home", path: "/" },
                  { title: "About Us", path: "/#about" },
                  { title: "Services", path: "/#services" },
                  { title: "Contact", path: "/contact" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-brand-text-muted hover:text-brand-primary transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Slide>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <Slide yAxis={20} delay={0.2}>
              <h3 className="text-brand-dark dark:text-white font-bold text-lg mb-6 tracking-wide">
                Support
              </h3>
              <ul className="space-y-4">
                {[
                  { title: "Help Center", path: "/" },
                  { title: "Terms of Service", path: "/" },
                  { title: "Privacy Policy", path: "/" },
                  { title: "Cookie Policy", path: "/" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-brand-text-muted hover:text-brand-primary transition-colors text-sm hover:translate-x-1 inline-block transform duration-200"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Slide>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <Slide yAxis={20} delay={0.3}>
              <h3 className="text-brand-dark dark:text-white font-bold text-lg mb-6 tracking-wide">
                Newsletter
              </h3>
              <p className="text-gray-600 dark:text-brand-text-muted text-sm mb-4">
                Subscribe to get special offers, free giveaways, and
                once-in-a-lifetime deals.
              </p>
              <form className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white dark:bg-brand-dark-lighter/50 border border-gray-300 dark:border-brand-dark-lighter text-brand-dark dark:text-white pl-4 pr-12 py-3 rounded-xl focus:outline-none focus:border-brand-primary placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/50 transition-colors dark-input-autofill"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 p-2 bg-brand-primary rounded-lg text-brand-dark hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
                >
                  <FaPaperPlane size={14} />
                </button>
              </form>
            </Slide>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-dark-lighter/30 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-brand-text-muted/60 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} World Global Ledger. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-500 dark:text-brand-text-muted/60 hover:text-brand-dark dark:hover:text-white text-sm transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/"
              className="text-gray-500 dark:text-brand-text-muted/60 hover:text-brand-dark dark:hover:text-white text-sm transition-colors"
            >
              Terms
            </Link>
            <Link
              to="/"
              className="text-gray-500 dark:text-brand-text-muted/60 hover:text-brand-dark dark:hover:text-white text-sm transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
