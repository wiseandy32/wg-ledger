import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
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
    <div className="bg-brand-dark min-h-screen relative overflow-hidden pt-20">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
              Get in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed">
              Our dedicated support team is available 24/7 to assist you with
              your secure ledger needs.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <div className="bg-brand-dark-lighter/20 border border-brand-dark-lighter/50 rounded-3xl p-8 backdrop-blur-sm hover:border-brand-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">
                <MessageSquare className="text-brand-primary w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Priority Support
              </h3>
              <p className="text-brand-text-muted mb-6">
                For urgent inquiries regarding your vault or transactions,
                please use our secure messaging channel.
              </p>
              <div className="flex items-center gap-3 text-white font-medium">
                <Mail className="text-brand-primary w-5 h-5" />
                admin@worldglobal-ledger.com
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-brand-dark-lighter/20 border border-brand-dark-lighter/50 rounded-3xl p-8 backdrop-blur-sm">
                <MessageSquare className="text-brand-primary w-8 h-8 mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">Live Chat</h4>
                <p className="text-brand-text-muted text-sm">
                  Chat with us directly by clicking on the chat icon at the
                  bottom-right corner of our website.
                </p>
              </div>
              <div className="bg-brand-dark-lighter/20 border border-brand-dark-lighter/50 rounded-3xl p-8 backdrop-blur-sm">
                <Clock className="text-brand-primary w-8 h-8 mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">
                  Operating Hours
                </h4>
                <p className="text-brand-text-muted text-sm">
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
            <div className="bg-brand-dark-lighter/30 backdrop-blur-xl border border-brand-dark-lighter/50 rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-text-muted pl-1">
                      First Name
                    </label>
                    <Input
                      required
                      placeholder="John"
                      className="h-12 bg-brand-dark-lighter/50 border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-brand-text-muted pl-1">
                      Last Name
                    </label>
                    <Input
                      required
                      placeholder="Doe"
                      className="h-12 bg-brand-dark-lighter/50 border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text-muted pl-1">
                    Email Address
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="h-12 bg-brand-dark-lighter/50 border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text-muted pl-1">
                    Subject
                  </label>
                  <Input
                    required
                    placeholder="Regarding my account..."
                    className="h-12 bg-brand-dark-lighter/50 border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-text-muted pl-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-4 bg-brand-dark-lighter/50 border border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl resize-none outline-none transition-all"
                  ></textarea>
                </div>

                <Button
                  variant="gooeyLeft"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-brand-primary text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-lg mt-4"
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
