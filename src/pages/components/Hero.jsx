import { Link } from "react-router-dom";
import Slide from "./Slide";
import bgVideo from "../../assets/ad.mp4";

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-brand-dark">
      {/* Background Video with heavy overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/80 dark:bg-brand-dark/80 z-10"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/20 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <Slide yAxis={50}>
          <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight text-brand-dark dark:text-white mb-6 leading-tight">
            The Digital Bank for Your <br className="hidden md:block" />
            <span className="text-gradient">Crypto Assets</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-brand-text-muted leading-relaxed">
            Experience the security of a Swiss vault with the freedom of
            blockchain. We offer institutional-grade banking infrastructure for
            your digital wealth, bridging the gap between traditional finance
            and DeFi.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-primary text-white font-bold text-lg hover:bg-brand-primary/90 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Get Started Now
            </Link>
            <Link
              to="login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl glass-button text-white font-semibold text-lg hover:text-brand-primary hover:border-brand-primary/50"
            >
              Login to Dashboard
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
                ISO20022 Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-sm font-medium text-slate-300">
                Quantum Secure
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
              <span className="text-sm font-medium text-slate-300">
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
