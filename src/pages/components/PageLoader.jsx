import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";

function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 18); // Adjust speed to match the 2.2s total loading time

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#021035] overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-[#021035] to-[#021035] opacity-50"></div>

      {/* Rotating Security Rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-brand-primary/20 border-t-brand-primary/60 border-dashed"
        ></motion.div>

        {/* Middle Ring (counter-rotate) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full border border-brand-accent/20 border-b-brand-accent/60"
        ></motion.div>

        {/* Inner Ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 p-8 rounded-full bg-[#021035]/50 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)]"
        >
          <motion.img
            src={logo}
            alt="Loading..."
            initial={{ filter: "brightness(0) invert(1) blur(10px)" }}
            animate={{ filter: "brightness(0) invert(1) blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="w-32 md:w-40 h-auto object-contain"
          />
        </motion.div>
      </div>

      {/* Modern Progress Indicator */}
      <div className="mt-12 relative z-10 flex flex-col items-center gap-2">
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold text-white tabular-nums tracking-tighter">
            {progress}
          </span>
          <span className="text-brand-primary text-xl font-medium mb-1">%</span>
        </div>
        <div className="w-48 h-[2px] bg-brand-dark-lighter/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-primary shadow-[0_0_10px_rgba(16,185,129,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
