import Slide from "./Slide";
import { motion } from "framer-motion";

const firstPartner = "/assets/first-partner.webp";
const secondPartner = "/assets/second-partner.webp";
const thirdPartner = "/assets/third-partner.webp";
const fourthPartner = "/assets/fourth-partner.webp";
const fifthPartner = "/assets/fifth-partner.webp";
const sixthPartner = "/assets/sixth-partner.webp";

const partners = [
  firstPartner,
  secondPartner,
  thirdPartner,
  fourthPartner,
  fifthPartner,
  sixthPartner,
];

function Partners() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-brand-dark/50 border-t border-gray-200 dark:border-brand-dark-lighter/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slide yAxis={20}>
          <p className="text-center text-brand-dark/60 dark:text-brand-text-muted/60 text-sm font-bold tracking-[0.2em] uppercase mb-12">
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
                <div className="absolute -inset-4 bg-brand-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <img
                  src={src}
                  alt="Partner"
                  className="relative h-10 md:h-12 w-auto object-contain grayscale dark:grayscale opacity-100 dark:opacity-50 brightness-0 dark:brightness-200 group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:brightness-100 transition-all duration-500 transform group-hover:scale-110"
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
