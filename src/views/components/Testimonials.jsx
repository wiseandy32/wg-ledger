import Slide from "./Slide";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "World Global Ledger has completely transformed how our firm manages digital assets. The improved liquidity and settlement speeds are unmatched in the current market.",
    author: "Alexander V.",
    role: "Chief Investment Officer",
  },
  {
    quote:
      "Finally, a crypto bank that understands the needs of everyday investors. I can pay my bills and trade from one sleek dashboard.",
    author: "Elena R.",
    role: "Small Business Owner",
  },
  {
    quote:
      "Security was our primary concern when moving strictly to digital finance. WGL's institutional-grade custody protocols gave us the confidence to make the switch.",
    author: "Sarah J.",
    role: "Managing Director",
  },
  {
    quote:
      "The interface is intuitive. I'm not a tech wizard, but managing my family's savings here feels safer and easier than my old bank.",
    author: "David K.",
    role: "Retired Teacher",
  },
  {
    quote:
      "The private banking concierge is exceptional. Having a dedicated specialist available 24/7 for complex cross-border transactions has been a game changer for my portfolio.",
    author: "Michael R.",
    role: "Private Investor",
  },
  {
    quote:
      "I moved my entire freelance income portfolio here. The instant settlement in USD is a lifesaver for my cash flow.",
    author: "Jessica T.",
    role: "Freelance Designer",
  },
];

function Testimonials() {
  return (
    <section className="py-24 bg-brand-icon dark:bg-brand-dark relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Slide yAxis={50} className="text-center">
            <span className="text-brand-icon-cyan font-bold tracking-wider uppercase text-sm">
              Community Trust
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white max-w-4xl mx-auto">
              Trusted by Everyday People & Business Executives
            </h2>
          </Slide>
        </div>

        {/* Marquee Container */}
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-marquee">
            {/* Original Items + Duplicates for Infinite Loop */}
            {[...testimonials, ...testimonials].map((item, idx) => (
              <li key={idx} className="w-[350px] md:w-[450px] flex-shrink-0">
                <div className="h-full bg-white border border-white/20 p-8 rounded-2xl relative group hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-black/10">
                  {/* Quote Icon */}
                  <div className="absolute top-8 right-8 text-gray-200 group-hover:text-brand-primary/20 transition-colors duration-300">
                    <FaQuoteLeft size={32} />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={14} />
                    ))}
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10 min-h-[100px]">
                    "{item.quote}"
                  </p>

                  <div className="mt-auto border-t border-gray-100 pt-4">
                    <p className="text-brand-dark font-bold text-lg">
                      {item.author}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-brand-primary text-sm font-medium">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
