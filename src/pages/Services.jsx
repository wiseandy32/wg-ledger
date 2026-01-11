import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoIosThunderstorm } from "react-icons/io";

const services = [
  {
    id: "vaults",
    title: "High-Yield Vaults",
    description:
      "Maximize your digital capital with our institutional-grade savings protocols. Earn interest on your crypto assets just like a savings account, but with significantly higher APY rates powered by decentralized lending markets.",
    icon: <FaHandHoldingDollar className="w-8 h-8" />,
    features: [
      "Industry-Leading APY Returns",
      "Instant Asset Liquidity",
      "Insured Custody Options",
      "Daily Interest Compounding",
    ],
  },
  {
    id: "private-banking",
    title: "Private Banking",
    description:
      "Exclusive financial management for high-net-worth individuals and institutions. Get access to a dedicated account manager, priority support, and bespoke investment strategies tailored to your wealth preservation goals.",
    icon: <MdOutlineSupportAgent className="w-8 h-8" />,
    features: [
      "Dedicated Account Manager",
      "OTC Trading Desk",
      "Estate Planning Services",
      "Tax-Efficient Structures",
    ],
  },
  {
    id: "fund-recovery",
    title: "Fund Recovery",
    description:
      "A safety net for the digital age. Our unique blockchain rollback functionality (available to premium tiers) offers protection against unauthorized transactions and accidental loss, providing a level of security previously impossible in crypto.",
    icon: <IoIosThunderstorm className="w-8 h-8" />,
    features: [
      "24h Settlement Reversal Window",
      "Unauthorized Transaction Protection",
      "Verified Rollback Protocol",
      "Fraud Investigation Team",
    ],
  },
];

function Services() {
  return (
    <div className="bg-brand-dark min-h-screen relative overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-brand-primary font-bold tracking-wider uppercase text-sm mb-4 block">
              World Global Ledger Ecosystem
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              A Full-Service{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Crypto Bank
              </span>
            </h1>
            <p className="text-xl text-brand-text-muted max-w-3xl mx-auto leading-relaxed">
              From automated yield generation to institutional custody, we
              provide every financial tool you need to secure and grow your
              wealth.
            </p>
          </motion.div>
        </div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <div className="w-full aspect-video rounded-3xl overflow-hidden border border-brand-dark-lighter/50 shadow-2xl relative group max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-all duration-300 pointer-events-none z-10"></div>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/2Sd1lGBTLrg?si=G6-qfhZvVjAbuuZ-"
              title="Platform Tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full object-cover"
            ></iframe>
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {service.title}
                </h2>
                <p className="text-lg text-brand-text-muted leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-center gap-3 text-brand-text-muted"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="bg-brand-dark-lighter/20 border border-brand-dark-lighter/50 rounded-3xl p-8 h-full min-h-[300px] flex items-center justify-center relative overflow-hidden group hover:border-brand-primary/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {/* Decorative Abstract Graphic */}
                  <div className="relative z-10 text-center">
                    <div className="text-9xl opacity-10 text-brand-primary group-hover:scale-110 transition-transform duration-700">
                      {service.icon}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to upgrade your financial infrastructure?
            </h2>
            <p className="text-brand-text-muted mb-8">
              Join thousands of institutions and individuals banking on the
              future.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-brand-primary text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all text-lg"
            >
              Open Your Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
