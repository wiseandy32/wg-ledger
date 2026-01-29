import Slide from "./Slide";
import { motion } from "framer-motion";

const partners = [
  "/company1.png",
  "/company2.png",
  "/company3.png",
  "/company4.png",
  "/company5.png",
  "/company6.png",
  "/company7.png",
];

function Partners() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-brand-dark/50 border-t border-gray-200 dark:border-brand-dark-lighter/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slide yAxis={20}>
          <p className="text-center text-brand-icon font-bold tracking-[0.2em] uppercase mb-12">
            Trusted by Industry Leaders
          </p>
        </Slide>

        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-80 max-w-5xl mx-auto">
          {/* Duplicating original partners to create a balanced, fuller grid as requested */}
          {partners.map((src, index) => (
            <Slide
              key={index}
              delay={index * 0.1}
              className="group cursor-pointer transition-all duration-500 w-[120px] sm:w-[150px] flex justify-center"
            >
              <div className="relative">
                {/* Glow effect on hover */}
                <div className="absolute -inset-4 bg-brand-icon/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <img
                  src={src}
                  alt="Partner"
                  className="relative h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 saturate-[1.2] brightness-110 group-hover:scale-110 transition-all duration-500"
                />
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
