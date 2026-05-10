"use client";

import React from 'react';
import Slide from "@/views/components/Slide";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Introduction",
      content: (
        <div className="space-y-4">
          <p>
            At Quantum Global System, we are wholly committed to safeguarding the privacy and security of our users' personal and financial data. This comprehensive Privacy Policy dictates the ongoing processes by which Quantum Global System ("we", "us", "our") collects, utilizes, manages, shares, and secures information deriving from your use of the quantumglobal-system.com website, associated applications, APIs, and exchange platforms (collectively, the "Services").
          </p>
          <p>
            By opting to engage with our Services, you explicitly consent to the data practices modeled within this Privacy Policy. If you find any provision in this document unacceptable, you must immediately cease all interactions with the Quantum Global System platform.
          </p>
        </div>
      )
    },
    {
      title: "2. Information We Collect",
      content: (
        <div className="space-y-4">
          <p>
            We collect various spectrums of information depending on your level of interaction with our platform. The categories of data harvested include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personally Identifiable Information (PII):</strong> Full legal name, date of birth, residential address, nationality, gender, government-issued identification numbers, and contact details (email address and phone number).</li>
            <li><strong>Financial & Transactional Data:</strong> Bank account numbers, routing numbers, credit/debit card profiles, cryptocurrency wallet addresses, transaction history, trade execution records, deposit/withdrawal ledgers, and proof of wealth origins.</li>
            <li><strong>Behavioral & Technical Data:</strong> IP addresses, browser fingerprinting, device operational identifiers (e.g., IMEI, MAC address), operating system variations, access timestamps, page navigation schemas, and geo-location metrics.</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Mechanisms of Data Acquisition",
      content: (
        <div className="space-y-4">
          <p>
            Data is synthesized not only directly from user input (such as account creation and KYC submission forms) but is also acquired through automated digital tracking via Cookies, Web Beacons, Pixel Tags, and algorithmic surveillance scripts operating perpetually in the background of your sessions. 
          </p>
          <p>
            We may additionally procure data regarding your economic standing and background history from public databases, blockchain explorers, anti-fraud consortiums, credit bureaus, and international sanction registry list maintainers.
          </p>
        </div>
      )
    },
    {
      title: "4. Purpose of Data Processing",
      content: (
        <div className="space-y-4">
          <p>
            The cardinal goals for processing your data strictly align with providing a frictionless yet exceptionally secure trading environment. Specific utilities include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Core Provisioning:</strong> Facilitating capital transfers, clearing cryptocurrency conversions, and reconciling financial agreements.</li>
            <li><strong>Legal & Regulatory Adherence:</strong> Operating mandatory Anti-Money Laundering (AML) monitoring, fulfilling judicial subpoenas, and conducting systematic fraud deterrence protocols.</li>
            <li><strong>System Integrity:</strong> Analyzing vulnerability logs, diagnosing server distress nodes, and deploying automated safeguards against distributed denial-of-service (DDoS) impacts or unauthorized intrusion attempts.</li>
            <li><strong>Platform Optimization:</strong> Utilizing anonymized heuristics to redesign user interface flows, calibrate matching engine speeds, and personalize promotional initiatives.</li>
          </ul>
        </div>
      )
    },
    {
      title: "5. Information Sharing and Disclosure",
      content: (
        <div className="space-y-4">
          <p>
            We explicitly declare that Quantum Global System does not sell your Personal Information to unauthorized secondary brokers. Nevertheless, operational necessities mandate the sharing of specifics with:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Third-Party Vendors:</strong> Including regulated custodial partners, identity verification processors (e.g., Onfido, Jumio), fiat-ramp liquidity providers, and cloud hosting architectures (e.g., AWS, Azure) operating under strict non-disclosure obligations.</li>
            <li><strong>Law Enforcement & Regulators:</strong> We will unilaterally distribute your documentation to domestic or international governmental authorities if necessitated by a valid warrant, court order, or when explicitly requested by bodies investigating money laundering matrices or terrorism-related monetary chains.</li>
            <li><strong>Corporate Reorganizations:</strong> In the event of an acquisition, merger, corporate insolvency, or significant liquidity-asset sale, your data will transfer as part of the operational entity.</li>
          </ul>
        </div>
      )
    },
    {
      title: "6. Blockchain Transparency Caveat",
      content: (
        <div className="space-y-4">
          <p>
            Operating fundamentally in the cryptocurrency space means incorporating decentralized networks. It is crucial to internalize that transactions across blockchain protocols (such as Bitcoin or Ethereum) are inherently immutable and fully public. 
          </p>
          <p>
            While Quantum Global System acts stringently to conceal internal ledgers, the moment you request a withdrawal of digital assets to a private non-custodial wallet address, the network broadcasting logs that address alongside the respective amount structure. Sophisticated entities can execute heuristic analysis traversing these public chains to link your identity. Quantum Global System holds zero capability to alter, erase, or privatize public blockchain metadata.
          </p>
        </div>
      )
    },
    {
      title: "7. Data Retention Cycles",
      content: (
        <div className="space-y-4">
          <p>
            We retain your Personal Data for as long as your Quantum Global System account possesses an active status, and for a protracted period post-closure to abide by international banking obligations. Typically, KYC artifacts, financial histories, and trade execution scripts are forcibly retained for a minimum of five (5) to eight (8) years following the ultimate cessation of your account to facilitate longitudinal regulatory audits.
          </p>
        </div>
      )
    },
    {
      title: "8. Global Security Posture",
      content: (
        <div className="space-y-4">
          <p>
            Securing user data is the pinnacle of Quantum Global System's operational doctrine. We shield systems via enterprise-grade firewall apparatuses, transit-level encryption schemes (TLS 1.3), and asymmetric cryptography for vault databases. Internal personnel accesses are strictly compartmentalized and monitored under the Principle of Least Privilege (PoLP). While we execute state-of-the-art protections against data expropriation, users must acknowledge that the absolute security of the Internet can never be mathematically guaranteed. 
          </p>
        </div>
      )
    },
    {
      title: "9. International Data Rights",
      content: (
        <div className="space-y-4">
          <p>
            Quantum Global System is committed to honoring global privacy standards modeled off frameworks like the General Data Protection Regulation (GDPR). Depending on your locality, you may exercise rights to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Request a comprehensive manifest of the personal data we aggregate concerning you.</li>
            <li>Implement constraints restricting our processing paradigms under certain disputable assumptions.</li>
            <li>Demand rectifications or wholesale expunging of your data (the "Right to be Forgotten"), explicitly contingent upon the overriding statutes of our AML retention mandates.</li>
          </ul>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D14] text-gray-800 dark:text-gray-200 selection:bg-emerald-500/30">
      {/* Premium Header Banner */}
      <div className="relative py-28 bg-brand-dark overflow-hidden border-b border-white/5 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[160%] bg-emerald-600/10 blur-[140px] rounded-full mix-blend-screen mix-blend-lighten pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[60%] h-[160%] bg-teal-500/10 blur-[140px] rounded-full mix-blend-screen mix-blend-lighten pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            A comprehensive exposition of how Quantum Global System protects your privacy, enforces data security, and interacts with global compliance frameworks.
          </p>
        </div>
      </div>

      {/* Structured Content Section with Navigation Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Table of Contents - Desktop Only */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-12 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                Contents
              </h3>
              <ul className="space-y-3">
                {sections.map((section, idx) => (
                  <li key={idx}>
                    <a href={`#section-${idx}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Legal Content */}
          <div className="lg:w-3/4 space-y-16">
            {sections.map((section, idx) => (
              <div key={idx} id={`section-${idx}`} className="scroll-mt-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                  {section.title}
                </h2>
                <div className="text-base leading-loose text-gray-600 dark:text-gray-300">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
