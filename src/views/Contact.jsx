"use client";
import { motion } from "framer-motion";
import { Mail, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent! We will get back to you shortly.");
      e.target.reset();
    }, 1500);
  };

  return (
    <div className="bg-zinc-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Hero Section */}
      {/* Hero Section */}
      <div className="pt-32 pb-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-brand-dark dark:text-white tracking-tight mb-6">
              Get in <span>Touch</span>
            </h1>
            <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Our dedicated support team is available 24/7 to assist you with
              your secure ledger needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="bg-white/50 dark:bg-brand-dark-lighter/20 border border-gray-200 dark:border-brand-dark-lighter/50 rounded-3xl p-8 backdrop-blur-sm hover:border-brand-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
                <MessageSquare className="text-brand-icon w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-2">
                Priority Support
              </h3>
              <p className="text-gray-800 dark:text-gray-200 mb-6">
                For urgent inquiries regarding your vault or transactions,
                please use our secure messaging channel.
              </p>
              <div className="flex items-center gap-3 text-brand-dark dark:text-white font-medium">
                <Mail className="text-brand-icon w-5 h-5" />
                admin@worldglobal-ledger.com
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/50 dark:bg-brand-dark-lighter/20 border border-gray-200 dark:border-brand-dark-lighter/50 rounded-3xl p-8 backdrop-blur-sm">
                <MessageSquare className="text-brand-icon w-8 h-8 mb-4" />
                <h4 className="text-lg font-bold text-brand-dark dark:text-white mb-2">
                  Live Chat
                </h4>
                <p className="text-gray-800 dark:text-gray-300 text-sm">
                  Chat with us directly by clicking on the chat icon at the
                  bottom-right corner of our website.
                </p>
              </div>
              <div className="bg-white/50 dark:bg-brand-dark-lighter/20 border border-gray-200 dark:border-brand-dark-lighter/50 rounded-3xl p-8 backdrop-blur-sm">
                <Clock className="text-brand-icon w-8 h-8 mb-4" />
                <h4 className="text-lg font-bold text-brand-dark dark:text-white mb-2">
                  Operating Hours
                </h4>
                <p className="text-gray-800 dark:text-gray-300 text-sm">
                  24/7/365
                  <br />
                  Always Online
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white/60 dark:bg-brand-dark-lighter/30 backdrop-blur-xl border border-gray-200 dark:border-brand-dark-lighter/50 rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 pl-1">
                      First Name
                    </label>
                    <Input
                      required
                      placeholder="John"
                      className="h-12 bg-white/70 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-brand-dark dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 pl-1">
                      Last Name
                    </label>
                    <Input
                      required
                      placeholder="Doe"
                      className="h-12 bg-white/70 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-brand-dark dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 pl-1">
                    Email Address
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 bg-white/70 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-brand-dark dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 pl-1">
                    Subject
                  </label>
                  <Input
                    required
                    placeholder="Regarding my account..."
                    className="h-12 bg-white/70 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-brand-dark dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-800 dark:text-gray-200 pl-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-4 bg-white/70 dark:bg-brand-dark-lighter/50 border border-gray-300 dark:border-brand-dark-lighter text-brand-dark dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl resize-none outline-none transition-all"
                  ></textarea>
                </div>

                <Button
                  variant="gooeyLeft"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-brand-primary text-white dark:text-black font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-lg mt-4"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
