"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

function ForgotPassword() {
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sendPasswordResetLink = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");
    try {
      const response = await fetch("/api/send-password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsResetLinkSent(true);
      } else {
        setError(
          data.message || data.error || "An error occurred. Please try again.",
        );
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-slate-50 dark:bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-white dark:bg-brand-dark-lighter/30 backdrop-blur-sm border border-gray-200 dark:border-brand-dark-lighter/50 p-8 rounded-3xl shadow-xl">
          {!isResetLinkSent ? (
            <form
              className="flex flex-col gap-6"
              onSubmit={sendPasswordResetLink}
            >
              <div className="text-center">
                <h1 className="font-bold text-3xl sm:text-4xl tracking-tight text-brand-dark dark:text-white mb-3">
                  Reset Password
                </h1>
                <p className="text-gray-600 dark:text-brand-text-muted text-sm">
                  Enter your email address to receive a password reset link
                </p>
              </div>

              {!error ? null : (
                <p className="text-white bg-red-500/10 border border-red-500/20 w-full p-3 rounded-xl font-medium text-sm text-red-500 flex items-center gap-2">
                  <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="capitalize text-sm font-medium text-gray-700 dark:text-brand-text-muted pl-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-muted/50" />
                  <Input
                    type="email"
                    required
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    className="h-12 pl-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                <Button
                  variant="gooeyLeft"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-brand-primary text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-base"
                >
                  {!isSubmitting ? null : (
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  )}
                  {!isSubmitting ? "Send Reset Link" : "Sending..."}
                </Button>

                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 text-gray-600 dark:text-brand-text-muted hover:text-brand-dark dark:hover:text-white transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 flex flex-col items-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="font-bold text-2xl sm:text-3xl tracking-tight text-brand-dark dark:text-white mb-3">
                Email Sent
              </h1>
              <p className="text-gray-600 dark:text-brand-text-muted text-sm mb-8">
                We've sent a password reset link to your email. Please check
                your inbox and follow the instructions.
              </p>
              <Link href="/auth/login" className="w-full">
                <Button
                  variant="gooeyLeft"
                  className="w-full h-12 bg-brand-primary text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-base"
                >
                  Return to Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
