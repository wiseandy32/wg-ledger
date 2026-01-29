"use client";
import Link from "next/link";
import { loginFormFields } from "../data";

import { useSearchParams, useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getSingleDocument } from "@/lib/helpers";

function Login() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const login = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setError("");
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getSingleDocument(user.uid);

      if (userDoc.isDeleted) {
        localStorage.removeItem("wglid");
        signOut(auth);
        setIsSubmitting(false);
        setError("This user does not exist");
        return;
      }

      const from = searchParams.get("from") || "/user";
      router.push(from);
    } catch (error) {
      const { code } = error;
      console.error(error);
      if (code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (code === "auth/network-request-failed") {
        setError("Check your internet connection and try again.");
      } else if (code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("An error occurred. Please try again.");
      }
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
          <form className="flex flex-col gap-6" onSubmit={(e) => login(e)}>
            <div className="text-center">
              <h1 className="font-bold text-4xl sm:text-5xl tracking-tight text-brand-dark dark:text-white mb-2">
                Welcome back!
              </h1>
              <p className="text-gray-600 dark:text-gray-200 text-sm">
                Sign in to access your secure ledger
              </p>
            </div>

            {!error ? null : (
              <p className="bg-red-500/10 border border-red-500/20 w-full p-3 rounded-xl font-medium text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
                {error}
              </p>
            )}
            <div className="flex flex-col gap-5">
              {loginFormFields.map((field) => (
                <div className="flex flex-col gap-2" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="capitalize text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
                  >
                    {field.label}
                  </label>
                  <div className="relative">
                    <Input
                      type={
                        field.name === "password"
                          ? showPassword
                            ? "text"
                            : "password"
                          : field.type
                      }
                      placeholder={field?.placeholder}
                      required
                      id={field.name}
                      name={field.name}
                      className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl transition-all pr-11"
                    />
                    {field.name === "password" && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-brand-text-muted/50 dark:hover:text-brand-text-muted transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href={"/auth/forgot-password"}
              className="self-end text-brand-primary hover:text-brand-primary/80 transition-colors text-sm font-medium"
            >
              Forgot password?
            </Link>
            <Button
              variant="gooeyLeft"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-brand-primary text-white dark:text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-base mt-2"
            >
              {!isSubmitting ? null : (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              )}
              {!isSubmitting || error ? "Login" : "Signing in..."}
            </Button>
          </form>
          <div className="flex py-6 gap-2 text-sm text-brand-text-muted justify-center border-t border-brand-dark-lighter/50 mt-12">
            <p>Don&apos;t have have an account? </p>
            <Link
              href={"/auth/register"}
              className="text-brand-primary font-semibold hover:text-brand-primary/80 transition-colors"
            >
              Create one
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
