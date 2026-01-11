import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#021035] overflow-hidden"
    >
      {/* Cinematic Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-[#021035] to-[#021035] opacity-50"
      ></motion.div>

      <motion.div
        className="relative flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 1, 1, 0],
          transition: {
            duration: 1.5,
            times: [0, 0.05, 0.85, 1],
            ease: "easeInOut",
          },
        }}
      >
        {/* Animated SVG Rings */}
        <div className="relative flex items-center justify-center">
          <svg
            className="w-64 h-64 md:w-80 md:h-80 -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Outer Drawing Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="301.6"
              initial={{ strokeDashoffset: 301.6 }}
              animate={{
                strokeDashoffset: 0,
                color: ["#10b981", "#10b981", "#ffffff"],
              }}
              transition={{
                strokeDashoffset: { duration: 0.8, ease: "easeInOut" },
                color: { duration: 1.2, times: [0, 0.6, 0.7] }, // Changes color matching logo reveal
              }}
            />
            {/* Inner Drawing Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="251.3"
              initial={{ strokeDashoffset: 251.3 }}
              animate={{
                strokeDashoffset: 0,
                color: ["#f59e0b", "#f59e0b", "#ffffff"],
              }}
              transition={{
                strokeDashoffset: {
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeInOut",
                },
                color: { duration: 1.2, times: [0, 0.6, 0.7] },
              }}
            />
          </svg>

          {/* Logo Centerpiece */}
          <motion.div
            className="absolute z-10 p-8 rounded-full bg-[#021035]/50 backdrop-blur-sm shadow-[0_0_50px_rgba(16,185,129,0.1)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: [0, 0, 1, 1],
              scale: [0.9, 0.9, 1, 1],
            }}
            transition={{
              duration: 1.2,
              times: [0, 0.6, 0.75, 1],
              ease: "easeOut",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="w-24 md:w-32 h-auto object-contain brightness-0 invert"
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default PageLoader;
