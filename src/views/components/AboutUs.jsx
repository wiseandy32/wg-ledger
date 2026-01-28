"use client";
import Link from "next/link";
import Slide from "./Slide";

function AboutUs() {
  return (
    <section
      className="relative py-20 overflow-hidden bg-zinc-50 dark:bg-brand-dark"
      id="about"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          {/* Content Side */}
          <Slide xAxis={-50} className="w-full lg:w-1/2">
            <div className="glass-card bg-white dark:bg-brand-dark-lighter/30 p-8 md:p-10 rounded-2xl relative overflow-hidden group hover:border-brand-primary/20 transition-all duration-500">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-primary to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>

              <span className="inline-block text-brand-primary font-bold tracking-wider text-sm uppercase mb-3">
                Next-Gen Banking
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark dark:text-white mb-6 leading-tight">
                Traditional Banking Security, <br />
                <span className="text-gradient">Blockchain Freedom</span>
              </h2>

              <p className="text-gray-600 dark:text-brand-text-muted mb-8 leading-relaxed text-lg">
                We are not just an exchange; we are a full-service digital
                custodian. Manage your crypto portfolio with the same ease and
                security as a traditional bank account, but with instant global
                settlements, higher yields, and complete asset ownership.
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "FDIC-Style Asset Protection logic",
                  "Instant Global Wire Transfers",
                  "Institutional Cold Storage Custody",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-brand-text"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary text-xs">
                      ✓
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-brand-primary text-white font-semibold hover:bg-brand-primary/90 hover:shadow-lg hover:shadow-brand-primary/25 transition-all duration-300"
              >
                Connect Wallet
              </Link>
            </div>
          </Slide>

          {/* Image Side */}
          <Slide xAxis={50} className="w-full lg:w-1/2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-brand-dark-lighter/50 group">
              <div className="absolute inset-0 bg-white/10 dark:bg-brand-dark/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
              <img
                src="/about-image-2.avif"
                alt="About WGL"
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Stat Card */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="glass-card p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-brand-text-muted text-xs uppercase">
                      Total Volume
                    </p>
                    <p className="text-brand-dark dark:text-white font-bold text-xl">
                      $2.4B+
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                    ⚡
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
