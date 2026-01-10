import Slide from "./Slide";
import firstPartner from "../../assets/first-partner.webp";
import secondPartner from "../../assets/second-partner.webp";
import thirdPartner from "../../assets/third-partner.webp";
import fourthPartner from "../../assets/fourth-partner.webp";
import fifthPartner from "../../assets/fifth-partner.webp";
import sixthPartner from "../../assets/sixth-partner.webp";

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
    <section className="py-24 bg-brand-dark/50 border-t border-brand-dark-lighter/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slide yAxis={20}>
          <p className="text-center text-brand-text-muted/60 text-sm font-bold tracking-[0.2em] uppercase mb-12">
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
                  className="relative h-10 md:h-12 w-auto object-contain grayscale opacity-50 brightness-200 group-hover:grayscale-0 group-hover:opacity-100 group-hover:brightness-100 transition-all duration-500 transform group-hover:scale-110"
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
