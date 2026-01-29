"use client";
import Link from "next/link";
import Slide from "./Slide";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-icon dark:bg-brand-dark">
      {/* Background Video with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand-icon/90 dark:bg-brand-dark/90 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        >
          <source src="/ad.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <Slide yAxis={50}>
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            The Digital Bank for Your <br className="hidden md:block" />
            <span className="text-white">Crypto Assets</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
            Experience the security of a Swiss vault with the freedom of
            blockchain. We offer institutional-grade banking infrastructure for
            your digital wealth, bridging the gap between traditional finance
            and DeFi.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white dark:bg-brand-icon text-brand-icon dark:text-black font-bold text-lg hover:bg-white/90 dark:hover:bg-brand-icon/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Get Started Now
            </Link>
            <Link
              href="/auth/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border-2 border-white/20 text-white font-semibold text-lg hover:bg-white/10 hover:border-white transition-all backdrop-blur-sm"
            >
              Login to Dashboard
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-8 md:gap-16 opacity-90">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
              <span className="text-sm font-medium text-white/80">
                ISO20022 Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
              <span className="text-sm font-medium text-white/80">
                Quantum Secure
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]"></div>
              <span className="text-sm font-medium text-white/80">
                Instant Settlement
              </span>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
}

export default Hero;
