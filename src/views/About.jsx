"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Quantum Security",
    description:
      "Utilizing state-of-the-art encryption and cold storage protocols to ensure your assets are impenetrable.",
    icon: "🛡️",
  },
  {
    title: "Global Compliance",
    description:
      "Fully regulated and compliant with international banking standards, providing you with peace of mind.",
    icon: "🌐",
  },
  {
    title: "Instant Settlement",
    description:
      "Experience the speed of blockchain. No more waiting days for international transfers to clear.",
    icon: "⚡",
  },
];

function About() {
  return (
    <div className="bg-zinc-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="pt-32 pb-20 relative bg-brand-icon dark:bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Redefining Trust
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              We are building the world&apos;s most secure and transparent
              digital banking infrastructure, strictly for the future of
              finance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-20">
        {/* Main Content Split */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-brand-dark-lighter/50 group">
              <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-all duration-500 z-10"></div>
              <img
                src="/assets/institutional_security.png"
                alt="Future of Banking"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white leading-tight">
              More than a Bank. <br />
              <span className="text-brand-primary">A Digital Fortress.</span>
            </h2>
            <p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
              World Global Ledger was founded on a simple premise: your money
              should be truly yours. secure, accessible, and growing. We combine
              the reliability of traditional Swiss-style banking with the
              technological breakthrough of Distributed Ledger Technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-brand-dark-lighter/30 border border-gray-200 dark:border-brand-dark-lighter/50 backdrop-blur-sm">
                <h3 className="text-brand-dark dark:text-white font-bold text-xl mb-2">
                  3.5B+
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Assets Secured
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white/50 dark:bg-brand-dark-lighter/30 border border-gray-200 dark:border-brand-dark-lighter/50 backdrop-blur-sm">
                <h3 className="text-brand-dark dark:text-white font-bold text-xl mb-2">
                  120+
                </h3>
                <p className="text-sm text-gray-500 dark:text-brand-text-muted">
                  Countries Served
                </p>
              </div>
            </div>
            <div className="pt-6">
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-brand-icon text-white dark:text-black font-bold hover:bg-brand-icon/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-white/50 dark:bg-brand-dark-lighter/20 border border-gray-200 dark:border-brand-dark-lighter/50 hover:border-brand-primary/30 transition-all hover:-translate-y-2"
            >
              <div className="text-4xl mb-6">
                <span>{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core Values Section */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark dark:text-white mb-6">
              Our{" "}
              <span className="text-brand-primary dark:text-white">
                Core Values
              </span>
            </h2>
            <p className="text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
              The principles that guide every decision we make in building the
              future of finance.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Sovereignty",
                desc: "True ownership of your assets without intermediary control.",
              },
              {
                title: "Transparency",
                desc: "Open, verifiable ledgers that cannot be manipulated.",
              },
              {
                title: "Innovation",
                desc: "Constantly pushing the boundaries of financial technology.",
              },
              {
                title: "Privacy",
                desc: "Your financial data deserves the highest standard of protection.",
              },
            ].map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white/50 dark:bg-brand-dark-lighter/10 border border-gray-200 dark:border-brand-dark-lighter/30 hover:bg-white dark:hover:bg-brand-dark-lighter/20 hover:border-brand-primary/20 transition-all text-center group"
              >
                <div className="w-2 h-2 rounded-full bg-brand-icon mx-auto mb-4 group-hover:scale-150 transition-transform"></div>
                <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* The Foundation (Lore) */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 bg-brand-icon dark:bg-background py-24 mb-[-64px] pb-32">
          <div className="absolute inset-0 bg-brand-accent/5 mix-blend-overlay pointer-events-none dark:hidden"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                The <span className="text-white">Foundation</span>
              </h2>
              <p className="text-lg text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
                World Global Ledger stands as the world&apos;s most secure
                ledger, specially crafted by the{" "}
                <span className="text-white font-medium">
                  Quantum Financial System
                </span>{" "}
                in collaboration with global financial sovereignty initiatives.
                We are the bridge between the reliability of traditional asset
                protection and the limitless potential of the new quantum
                economy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
                  AES-256 Encryption
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
                  Quantum Resistant
                </span>
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold">
                  Decentralized Governance
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
