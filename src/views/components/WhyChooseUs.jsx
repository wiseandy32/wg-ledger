import Slide from "./Slide";
import { chooseUsCardInfo } from "@/data";

function WhyChooseUs() {
  return (
    <section className="py-24 bg-brand-icon dark:bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slide yAxis={50} className="text-center mb-16">
          <p className="text-brand-icon-cyan font-bold tracking-wider uppercase text-sm mb-3">
            The New Standard in Finance
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Bank-Grade Reliability
          </h2>
          <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
            We've rebuilt the banking stack from the ground up using blockchain
            technology. Enjoy faster settlements, better rates, and superior
            security.
          </p>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chooseUsCardInfo.map((item, index) => (
            <Slide
              key={item.title}
              yAxis={50}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="group h-full bg-brand-dark-lighter/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-black/40">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-brand-dark/10 dark:bg-brand-dark/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-icon transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                    {item.subtext}
                  </p>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
