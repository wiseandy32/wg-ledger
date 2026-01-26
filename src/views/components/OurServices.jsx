import Slide from "./Slide"; // Keep Slide for animations
import { IoIosThunderstorm } from "react-icons/io";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";

function OurServices() {
  return (
    <section className="relative py-24 bg-white dark:bg-brand-dark overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <Slide yAxis={50} className="text-center mb-16">
          <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">
            Comprehensive Digital Finance
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-brand-dark dark:text-white">
            A Full-Service <span className="text-gradient">Crypto Bank</span>
          </h2>
          <p className="mt-4 text-brand-text-muted max-w-2xl mx-auto text-lg">
            From savings to settlements, we provide every financial tool you
            need to maximize your digital capital.
          </p>
        </Slide>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Main Video Feature - Spans Full Width */}
          <Slide
            xAxis={0}
            yAxis={50}
            className="md:col-span-3 h-full min-h-[500px]"
          >
            <div className="h-full w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-brand-dark-lighter/50 shadow-2xl relative group">
              <div className="absolute inset-0 bg-white/10 dark:bg-brand-dark/20 group-hover:bg-transparent transition-all duration-300 pointer-events-none z-10"></div>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/2Sd1lGBTLrg?si=G6-qfhZvVjAbuuZ-"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full object-cover"
              ></iframe>
            </div>
          </Slide>

          {/* Service Card 1: Interest/Yield */}
          <Slide xAxis={50} className="md:col-span-1 h-full">
            <div className="glass-card bg-zinc-50 dark:bg-brand-dark-lighter/30 p-8 rounded-2xl h-full hover:border-brand-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                <FaHandHoldingDollar size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">
                High-Yield Vaults
              </h3>
              <p className="text-gray-600 dark:text-brand-text-muted text-sm leading-relaxed mb-4">
                Earn interest on your crypto assets just like a savings account,
                but with significantly higher APY rates.
              </p>
              {/* Skill Bars */}
              <div className="space-y-3 mt-6">
                {["APY Returns", "Asset Liquidity", "Security"].map(
                  (skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-gray-700 dark:text-brand-text mb-1">
                        <span>{skill}</span>
                        <span className="text-brand-primary">
                          Best in Class
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-brand-dark-lighter rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-primary to-brand-accent w-[98%]"></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Slide>

          {/* Service Card 2: Private Banking */}
          <Slide yAxis={50} delay={0.2} className="md:col-span-1">
            <div className="glass-card bg-zinc-50 dark:bg-brand-dark-lighter/30 p-8 rounded-2xl h-full hover:border-brand-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6">
                <MdOutlineSupportAgent size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">
                Private Banking
              </h3>
              <p className="text-gray-600 dark:text-brand-text-muted text-sm leading-relaxed mb-6">
                Dedicated account managers and priority support for
                high-net-worth individuals and institutional clients.
              </p>
              <ul className="space-y-2">
                {[
                  "Personalized Wealth Strategy",
                  "OTC Trading Desk",
                  "Estate Planning Services",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-brand-text-muted"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Slide>

          {/* Service Card 3: Fund Recovery */}
          <Slide yAxis={50} delay={0.3} className="md:col-span-1">
            <div className="glass-card bg-zinc-50 dark:bg-brand-dark-lighter/30 p-8 rounded-2xl h-full flex flex-col hover:border-brand-primary/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6">
                <IoIosThunderstorm size={24} />
              </div>
              <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">
                Fund Recovery
              </h3>
              <p className="text-gray-600 dark:text-brand-text-muted text-sm leading-relaxed mb-6">
                Lost funds? Our unique blockchain rollback functionality
                (client-exclusive) offers a safety net others cannot provide.
              </p>
              <ul className="space-y-2 mt-auto">
                {[
                  "24h Settlement Reversal Window",
                  "Unauthorized Tx Protection",
                  "Verified Rollback Protocol",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs text-gray-600 dark:text-brand-text-muted"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}

export default OurServices;
