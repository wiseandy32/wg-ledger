"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // or OTP input if available
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function VerifyEmail() {
  const { user } = useAuth();
  const router = useRouter();
  const qc = useQueryClient();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60); // Start with 60s cooldown assuming we just sent it

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user?.uid, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Verification failed");
      }

      toast.success("Email verified successfully!");
      // Force refresh auth state so UserLayout sees the new isAccountVerified status
      await qc.invalidateQueries({ queryKey: ["uid", user?.uid] });
      router.push("/auth/complete-profile");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      const res = await fetch("/api/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user?.uid, email: user?.email }),
      });

      const data = await res.json();

      if (!res.ok) {
        // If it's a rate limit error, we might want to sync the countdown?
        // For now just show error.
        throw new Error(data.error || "Failed to resend");
      }

      toast.success("Verification code resent!");
      setCountdown(60);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-slate-50 dark:bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience (Same as Register) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="glass-card p-8 rounded-3xl shadow-xl text-center space-y-6">
          <div>
            <h1 className="text-2xl font-bold premium-gradient-text mb-2">
              Verify Your Email
            </h1>
            <p className="text-muted-foreground text-sm">
              We sent a 6-digit code to{" "}
              <span className="font-semibold text-foreground">
                {user?.email}
              </span>
              . Please enter it below to confirm your account.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <Input
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))
              }
              placeholder="123456"
              className="text-center text-2xl tracking-[0.5em] font-mono h-14"
              maxLength={6}
            />

            <Button
              type="submit"
              variant="gooeyRight"
              className="w-full h-12 text-base font-bold"
              disabled={isSubmitting || code.length !== 6}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>

          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-brand-text-muted mb-2">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResend}
              disabled={countdown > 0 || isResending}
              className="text-brand-primary hover:text-brand-primary/80"
            >
              {isResending ? (
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
              ) : null}
              {countdown > 0 ? `Resend code in v${countdown}s` : "Resend Code"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
