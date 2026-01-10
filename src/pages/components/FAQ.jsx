import { useState } from "react";
import Slide from "./Slide";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Is my capital insured?",
    answer:
      "Yes. All digital assets are held in segregated cold storage vaults backed by a comprehensive $1B insurance policy against theft, loss, or unauthorized access.",
  },
  {
    question: "How quickly can I withdraw my funds?",
    answer:
      "Instantly. Our 24/7 settlement network allows you to withdraw fiat or cryptocurrency immediately to any external bank account or wallet without holding periods.",
  },
  {
    question: "What currencies do you support?",
    answer:
      "We support over 50 fiat currencies (USD, EUR, GBP, JPY, etc.) and all major cryptocurrencies (BTC, ETH, USDC, etc.) for seamless conversion and storage.",
  },
  {
    question: "Are there any account maintenance fees?",
    answer:
      "We believe in transparency. There are no monthly maintenance fees for standard accounts. Premium tiers with dedicated banking agents may have specific service costs.",
  },
  {
    question: "How do I open an institutional account?",
    answer:
      "Simply click 'Register' to start our streamlined digital onboarding. For verified businesses and high-net-worth individuals, approval is typically completed within 24 hours.",
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div
      className={`border-b border-brand-dark-lighter transition-colors duration-300 ${
        isOpen ? "bg-brand-dark-lighter/10" : "bg-transparent"
      }`}
    >
      <button
        className="w-full py-6 px-4 flex items-center justify-between focus:outline-none group"
        onClick={onClick}
      >
        <span
          className={`text-lg font-medium text-left transition-colors duration-300 ${
            isOpen
              ? "text-brand-primary"
              : "text-white group-hover:text-brand-primary"
          }`}
        >
          {question}
        </span>
        <span
          className={`ml-6 flex-shrink-0 text-brand-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-4 text-brand-text-muted text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-brand-dark relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slide yAxis={50} className="text-center mb-16">
          <span className="text-brand-primary font-bold tracking-wider uppercase text-sm">
            Common Inquiries
          </span>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold text-white">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-brand-text-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about banking with the World Global
            Ledger.
          </p>
        </Slide>

        <div className="bg-brand-dark-lighter/20 backdrop-blur-sm border border-brand-dark-lighter/50 rounded-2xl overflow-hidden">
          {faqs.map((faq, index) => (
            <Slide key={index} delay={index * 0.1} yAxis={20}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
