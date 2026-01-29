"use client";
import Link from "next/link";
import Slide from "./Slide";

function LastSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-icon/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-brand-icon dark:bg-brand-dark-lighter border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl">
          {/* Inner Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-icon/10 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="flex-1 text-center md:text-left relative z-10">
            <Slide xAxis={-50}>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Experience the <br />
                <span className="text-white">Future of Banking?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto md:mx-0">
                Join over 24 million users who trust World Global Ledger with
                their financial future. Secure, instant, and borderless.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-brand-icon bg-white dark:text-black dark:bg-brand-icon rounded-xl hover:bg-white/90 dark:hover:bg-brand-icon/90 transition-all duration-300 shadow-lg shadow-black/20 hover:scale-105"
                >
                  Create an Account
                </Link>
              </div>
            </Slide>
          </div>

          <div className="flex-1 flex justify-center md:justify-end relative">
            <Slide xAxis={50} delay={0.2} className="relative z-10">
              <img
                src="/assets/qfs-card.png"
                alt="Global Banking Card"
                className="w-full max-w-sm md:max-w-md object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
              />
            </Slide>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LastSection;
