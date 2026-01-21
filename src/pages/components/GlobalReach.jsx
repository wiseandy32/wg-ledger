import Slide from "./Slide";
import { Link } from "react-router-dom";

const stats = [
  { value: "24M", label: "Account Holders" },
  { value: "3B", label: "Total Transactions" },
  { value: "120", label: "Total Branches" },
  { value: "240+", label: "Countries We Serve" },
];

function GlobalReach() {
  return (
    <section className="py-24 bg-white dark:bg-brand-dark-lighter/20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <Slide xAxis={-50} className="text-left">
            <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">
              Global Infrastructure
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-bold text-brand-dark dark:text-white leading-tight">
              We provide our banking services{" "}
              <span className="text-gradient">all over the world</span>
            </h2>
            <p className="mt-6 text-gray-600 dark:text-brand-text-muted text-lg leading-relaxed">
              World Global Ledger is a secure and robust e-Banking system,
              rapidly growing in popularity across the globe. We offer the best
              FDR, DPS, and Loan plans to our valued account holders.
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white dark:text-brand-dark bg-brand-primary rounded-full hover:bg-brand-primary/90 transition-all duration-300 shadow-lg shadow-brand-primary/20 hover:scale-105"
              >
                Open an Account
              </Link>
            </div>
          </Slide>

          {/* Stats Grid */}
          <Slide xAxis={50} delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-50 dark:bg-brand-dark-lighter/30 backdrop-blur-md border border-gray-200 dark:border-brand-dark-lighter/50 p-8 rounded-2xl text-center hover:border-brand-primary/30 transition-all duration-300 group"
                >
                  <h3 className="text-4xl md:text-5xl font-bold text-brand-dark dark:text-white mb-2 group-hover:text-brand-primary transition-colors">
                    {stat.value}
                  </h3>
                  <p className="text-gray-500 dark:text-brand-text-muted text-sm font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
}

export default GlobalReach;
