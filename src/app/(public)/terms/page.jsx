"use client";

import React from 'react';
import Slide from "@/views/components/Slide";

export default function TermsOfService() {
  const sections = [
    {
      title: "1. Acceptance and Applicability",
      content: (
        <div className="space-y-4">
          <p>
            These Terms of Service (the "Terms", "Agreement") form a binding legal agreement between you, the user ("User", "you", or "your"), and Quantum Global System ("Quantum Global System," "Company", "we", "us", or "our"). 
            By registering an account, accessing the quantumglobal-system.com website, its subdomains, associated mobile applications, or utilizing any services provided by Quantum Global System (collectively, the "Services"), you agree that you have read, understood, and accepted all of the terms and conditions contained in this Agreement.
          </p>
          <p>
            If you do not agree to these Terms, you must not access or use our Services. Quantum Global System reserves the right to modify these Terms at our sole discretion. Any changes will become effective immediately upon being published on the platform. Your continued use of the Services after such modifications constitutes your acceptance of the revised Terms.
          </p>
        </div>
      )
    },
    {
      title: "2. Eligibility and Account Registration",
      content: (
        <div className="space-y-4">
          <p>
            <strong>2.1 Eligibility:</strong> To use the Services, you must be at least 18 years of age (or the age of legal majority in your jurisdiction), have the legal capacity to enter into binding contracts, and not be a resident of, or located in, any blocked or sanctioned jurisdiction as designated by international regulatory bodies. Quantum Global System does not offer services to persons structured as entities operating from embargoed countries.
          </p>
          <p>
            <strong>2.2 Account Creation:</strong> To access our trading, deposit, and withdrawal features, you are required to register an account. During the registration phase, you agree to provide complete, accurate, and up-to-date information. If we suspect the data provided is false, incomplete, or out of date, we reserve the right to suspend or terminate your account without notice.
          </p>
          <p>
            <strong>2.3 Account Security:</strong> You hold sole responsibility for the confidentiality of your login credentials, API keys (if applicable), and any Two-Factor Authentication (2FA) mechanisms. Quantum Global System will never ask for your password. We bear no liability for any loss or damage arising from unauthorized access to your account resulting from the compromise of your credentials. Any activities occurring under your account are presumed to be authorized by you.
          </p>
        </div>
      )
    },
    {
      title: "3. Identity Verification, KYC, and AML Compliance",
      content: (
        <div className="space-y-4">
          <p>
            As a compliant financial technology platform, Quantum Global System strictly adheres to Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) standards globally. Consequently, all users are subject to an extensive Know Your Customer (KYC) verification process. 
          </p>
          <p>
            You agree to provide us with the information we request for the purposes of identity verification and the detection of money laundering, terrorist financing, fraud, or any other financial crime. Requested information may include, but is not limited to, government-issued identification documents, residential proofs (such as utility bills), tax identification numbers, and in some cases, proof of funds or wealth declarations.
          </p>
          <p>
            We may conduct inquiries either directly or through third-party specialized service providers to verify your identity. If you fail to pass our internal risk assessments or refuse to supply the necessary documentation, your access to Quantum Global System may be perpetually blocked, and your assets may be restricted subject to legal procedures.
          </p>
        </div>
      )
    },
    {
      title: "4. Deposits, Withdrawals, and Asset Custody",
      content: (
        <div className="space-y-4">
          <p>
            <strong>4.1 Fiat and Crypto Deposits:</strong> Users may deposit supported fiat currencies or designated digital assets into their Quantum Global System wallets. You acknowledge that fiat deposits are managed by registered third-party payment processors or partner banks, and processing times may vary based on banking cycles. Cryptocurrency deposits are subject to blockchain network congestion and require a specific number of block confirmations before being credited.
          </p>
          <p>
            <strong>4.2 Withdrawals:</strong> Withdrawals to external addresses or banking institutions are processed strictly in accordance with our withdrawal policies. Quantum Global System reserves the right to impose withdrawal limits based on your account's KYC progression tier. In events of high market volatility, network upgrades, or unforeseen technical irregularities, withdrawals may be temporarily halted at our discretion.
          </p>
          <p>
            <strong>4.3 Custody Risks:</strong> While Quantum Global System maintains state-of-the-art cold storage systems to protect user funds, holding digital assets on any centralized exchange involves inherent risks, including systemic hacks or operational failures. Quantum Global System undertakes best efforts to secure underlying assets but does not insure the digital assets against technical catastrophic events. 
          </p>
        </div>
      )
    },
    {
      title: "5. P2P Trading and Independent Trades",
      content: (
        <div className="space-y-4">
          <p>
            <strong>5.1 P2P Trading System Mechanism:</strong> The Quantum Global System features a peer-to-peer (P2P) matching engine allowing users to directly interact, trade, and settle digital and fiat instruments. You acknowledge that when engaging in P2P deals, you are entering into a transaction directly with another user. Quantum Global System provides the interface and order book but is not a counterparty to P2P trades.
          </p>
          <p>
            <strong>5.2 Independent Withdrawals:</strong> Certain transactions explicitly utilize an independent settlement infrastructure. Specifically, when participating in our P2P Trading System, both buyers and sellers must independently verify, authorize, and submit their transaction withdrawals or fund transfers. A given trade is strictly considered non-final and will categorically avoid a 'completed' status until both parties have verifiably withdrawn or exchanged their respective assets confirming full satisfaction of the trade.
          </p>
          <p>
            <strong>5.3 Dispute Resolution in P2P:</strong> Should conflicts arise concerning non-payment, delayed asset release, or asset receipt failure during an ongoing trade, users must utilize our internal arbitration system. Users grant the Quantum Global System compliance agents the irrevocable authority to scrutinize transaction logs, messaging histories, and on-chain proofs to adjudicate the dispute. The adjudication outcome derived by Quantum Global System is binding.
          </p>
        </div>
      )
    },
    {
      title: "6. Fees and Taxation",
      content: (
        <div className="space-y-4">
          <p>
            <strong>6.1 Platform Fees:</strong> Quantum Global System charges fees for various services, including but not limited to, trade execution (maker/taker fees), fiat withdrawal processing, and blockchain network (miner) fees for cryptocurrency withdrawals. The updated fee schedule is published contextually on the platform. We reserve the absolute right to amend this schedule automatically with adjustments reflected in the platform's UI without prior individualized notifications.
          </p>
          <p>
            <strong>6.2 Taxation:</strong> It is your sole responsibility to determine, collect, report, and remit the correct amount of tax applicable to your use of Quantum Global System. The platform acts as a non-advisory venue and explicitly does not offer tax advice, nor are we responsible for computing or paying any capital gains, income, or transaction taxes arising from your trades.
          </p>
        </div>
      )
    },
    {
      title: "7. General Risk Warnings",
      content: (
        <div className="space-y-4">
          <p>
            Trading in digital assets involves significant financial risk. The prices of cryptocurrencies are highly volatile and unpredictable. Fluctuations in price may result in the total loss of the initial capital deployed. Given this volatility, digital assets may not be suitable for all investors. 
          </p>
          <p>
             There is no guarantee against losses, and past performance of a digital asset is not a reliable indicator of future performance. Legislative or regulatory changes operating at domestic or international levels might adversely affect the use, transfer, exchange, and value of digital assets. By utilizing our Services, you explicitly represent that you possess sufficient financial intelligence to bear such risks and hold Quantum Global System utterly harmless of any capital depreciation.
          </p>
        </div>
      )
    },
    {
      title: "8. Termination and Suspension",
      content: (
        <div className="space-y-4">
          <p>
            Quantum Global System holds the unwavering right to suspend, restrict, or entirely terminate your access to any or all of the Services, and deactivate your account, if we suspect you have violated any provision of this Agreement, or if your usage poses operational security vulnerabilities, or under the direction of a government agency or subpoena. In the event of a suspension, pending investigations may temporarily freeze withdrawal capabilities. Upon termination due to compliance breaches, Quantum Global System retains the authority to deduct accrued compliance-related operational damages before returning residual balances, if permitted by jurisdiction.
          </p>
        </div>
      )
    },
    {
      title: "9. Intellectual Property",
      content: (
        <div className="space-y-4">
          <p>
            The software, visual interfaces, graphics, design, compilation, data, and all other elements of Quantum Global System are protected by intellectual property and copyright laws. All trademarks, service marks, and trade names are the property of Quantum Global System. You are granted a limited, personal, non-exclusive, and non-transferable license to utilize the platform explicitly for personal investing and banking purposes without modifying or redistributing our underlying architecture.
          </p>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D14] text-gray-800 dark:text-gray-200 selection:bg-brand-icon/30">
      {/* Premium Header Banner */}
      <div className="relative py-28 bg-brand-dark overflow-hidden border-b border-white/5 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-30%] left-[-20%] w-[60%] h-[160%] bg-blue-600/10 blur-[140px] rounded-full mix-blend-screen mix-blend-lighten pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-20%] w-[60%] h-[160%] bg-brand-icon/10 blur-[140px] rounded-full mix-blend-screen mix-blend-lighten pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            This document sets out the terms and conditions applying to your use of Quantum Global System. We strongly recommend that you carefully read these terms before initiating any transactions on our platform.
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
                    <a href={`#section-${idx}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-icon transition-colors">
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
