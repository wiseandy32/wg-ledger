"use client";

import React from 'react';

export default function CompanyPolicy() {
  const sections = [
    {
      title: "What information do we collect?",
      content: (
        <div className="space-y-4">
          <p>
            We gather data from you when you register on our site, submit a request, buy any services, react to an overview, or round out a structure. At the point when requesting any assistance or enrolling on our site, as suitable, you might be approached to enter your: name, email address, or telephone number. You may, nonetheless, visit our site anonymously.
          </p>
        </div>
      )
    },
    {
      title: "How do we protect your information?",
      content: (
        <div className="space-y-4">
          <p>
            All provided delicate/credit data is sent through Stripe. After an exchange, your private data (credit cards, social security numbers, financials, and so on) won't be put away on our workers.
          </p>
        </div>
      )
    },
    {
      title: "Do we disclose any information to outside parties?",
      content: (
        <div className="space-y-4">
          <p>
            We don't sell, exchange, or in any case move to outside gatherings by and by recognizable data. This does exclude confided in outsiders who help us in working our site, leading our business, or adjusting you, since those gatherings consent to keep this data private. We may likewise deliver your data when we accept discharge is suitable to follow the law, implement our site strategies, or ensure our own or others' rights, property, or wellbeing.
          </p>
        </div>
      )
    },
    {
      title: "Children's Online Privacy Protection Act Compliance",
      content: (
        <div className="space-y-4">
          <p>
            We are consistent with the prerequisites of COPPA (Children's Online Privacy Protection Act), we don't gather any data from anybody under 13 years old. Our site, items, and administrations are completely coordinated to individuals who are in any event 13 years of age or more established.
          </p>
        </div>
      )
    },
    {
      title: "Changes to our Privacy Policy",
      content: (
        <div className="space-y-4">
          <p>
            If we decide to change our privacy policy, we will post those changes on this page.
          </p>
        </div>
      )
    },
    {
      title: "How long we retain your information?",
      content: (
        <div className="space-y-4">
          <p>
            At the point when you register for our site, we cycle and keep your information we have about you however long you don't erase the record or withdraw yourself (subject to laws and guidelines).
          </p>
        </div>
      )
    },
    {
      title: "What we don’t do with your data",
      content: (
        <div className="space-y-4">
          <p>
            We don't and will never share, unveil, sell, or in any case give your information to different organizations for the promoting of their items or administrations.
          </p>
        </div>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D14] text-gray-800 dark:text-gray-200 selection:bg-purple-500/30">
      {/* Premium Header Banner */}
      <div className="relative py-28 bg-brand-dark overflow-hidden border-b border-white/5 shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-30%] right-[-20%] w-[60%] h-[160%] bg-purple-600/10 blur-[140px] rounded-full mix-blend-screen mix-blend-lighten pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[60%] h-[160%] bg-blue-500/10 blur-[140px] rounded-full mix-blend-screen mix-blend-lighten pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-6">
            Company Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
            Our guiding principles, commitments to customers, and operational regulations regarding the management of your relationship with us.
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
                    <a href={`#section-${idx}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
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
