import Slide from "./Slide";
import { FaUserPlus, FaIdCard, FaWallet, FaChartLine } from "react-icons/fa";

const steps = [
  {
    title: "Create an Account",
    desc: "Create an account in minutes. No hidden fees, just pure banking freedom.",
    icon: <FaUserPlus size={24} />,
  },
  {
    title: "Verify Your Identity",
    desc: "Complete our automated KYC process. Security is our priority, ensuring a safe ecosystem for all.",
    icon: <FaIdCard size={24} />,
  },
  {
    title: "Fund Your Account",
    desc: "Deposit funds via wire transfer, credit card, or crypto. Detailed support for over 50 currencies.",
    icon: <FaWallet size={24} />,
  },
  {
    title: "Start Banking",
    desc: "Access high-yield savings, instant transfers, and wealth management tools immediately.",
    icon: <FaChartLine size={24} />,
  },
];

function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Slide yAxis={50} className="text-center mb-16">
          <span className="text-brand-icon font-bold tracking-wider uppercase text-sm">
            Simple Onboarding
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-brand-dark dark:text-white">
            How It Works
          </h2>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <Slide key={idx} delay={idx * 0.15} xAxis={50}>
              <div className="relative group">
                {/* Connector Line (Desktop) */}
                {idx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-[2.5rem] left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-brand-accent/50 to-brand-primary/50 z-0"></div>
                )}

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-zinc-50 dark:bg-brand-dark-lighter border border-brand-icon/20 flex items-center justify-center text-brand-icon mb-6 shadow-lg shadow-brand-primary/5 group-hover:scale-110 group-hover:border-brand-icon/50 transition-all duration-300">
                    {step.icon}
                  </div>

                  <div className="inline-block px-3 py-1 rounded-full bg-brand-icon/10 text-brand-icon text-xs font-bold mb-4">
                    Step 0{idx + 1}
                  </div>

                  <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed max-w-[250px]">
                    {step.desc}
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

export default HowItWorks;
