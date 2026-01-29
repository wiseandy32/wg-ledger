"use client";
import Link from "next/link";
import { registrationFormField } from "../data";
import { useState, useEffect } from "react";
import { createUser, setDataToDb } from "../utils/auth";
import { auth } from "../services/firebase";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setIsSubmitting(true);
      // create a new user
      await createUser(
        formData.get("email"),
        formData.get("password"),
        setError,
      );

      const uid = auth.currentUser.uid;
      const verificationToken = uuidv4();

      const user = {
        name: formData.get("username"),
        username: formData.get("username"),
        email: formData.get("email"),
        uid,
        isDeleted: false,
        isAdmin: false,
        isAccountVerified: false,
        verificationToken,
        verificationTokenCreatedAt: serverTimestamp(),
      };

      await setDataToDb("users", uid, user);

      // Redirect to complete profile page instead of sending verification email and signing out
      router.push("/auth/complete-profile");
    } catch (error) {
      console.error(error);
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

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-brand-dark-lighter/30 backdrop-blur-sm border border-gray-200 dark:border-brand-dark-lighter/50 p-8 rounded-3xl shadow-xl">
          <form
            className="flex flex-col gap-6"
            onSubmit={async (e) => await onSubmit(e)}
            id="registrationForm"
          >
            <div className="text-center">
              <h1 className="font-bold text-4xl sm:text-5xl tracking-tight text-brand-dark dark:text-white mb-2">
                Create an account
              </h1>
              <p className="text-gray-600 dark:text-brand-text-muted text-sm">
                Join the world&apos;s most secure decentralized ledger
              </p>
            </div>

            {!error ? null : (
              <p className="text-white bg-red-500/10 border border-red-500/20 w-full p-3 rounded-xl font-medium text-sm text-red-500 flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </p>
            )}

            <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:justify-between">
              {registrationFormField.map((field) => (
                <div
                  className="flex flex-col gap-2 md:w-[48%]"
                  key={field.name}
                >
                  <label
                    htmlFor={field.name}
                    className="capitalize text-sm font-medium text-gray-700 dark:text-brand-text-muted pl-1"
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
                          : field.name === "confirmPassword"
                            ? showConfirmPassword
                              ? "text"
                              : "password"
                            : field.type
                      }
                      placeholder={field?.placeholder}
                      required
                      id={field.name}
                      name={field.name}
                      pattern={field?.pattern}
                      title={field?.title}
                      minLength={field?.min}
                      onBlur={
                        field.name !== "confirmPassword"
                          ? null
                          : (e) => {
                              const password = e.target
                                .closest("form")
                                .querySelector('input[name="password"]').value;
                              if (password !== e.target.value) {
                                setError(
                                  "Passwords do not match. Please ensure both fields are identical",
                                );
                              } else {
                                setError("");
                              }
                            }
                      }
                      className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl transition-all pr-11"
                    />
                    {(field.name === "password" ||
                      field.name === "confirmPassword") && (
                      <button
                        type="button"
                        onClick={() =>
                          field.name === "password"
                            ? setShowPassword(!showPassword)
                            : setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-brand-text-muted/50 dark:hover:text-brand-text-muted transition-colors"
                      >
                        {field.name === "password" ? (
                          showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )
                        ) : showConfirmPassword ? (
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

            <div className="flex items-center gap-2 pl-1">
              <input
                type="checkbox"
                name="hasAcceptedTerms"
                id="hasAcceptedTerms"
                required
                className="w-4 h-4 rounded border-gray-300 dark:border-brand-dark-lighter/50 bg-slate-50 dark:bg-brand-dark-lighter/30 text-brand-primary focus:ring-brand-primary/20"
              />
              <label
                htmlFor="hasAcceptedTerms"
                className="text-sm text-brand-text-muted"
              >
                I accept the{" "}
                <Link
                  href="/terms"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-all"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-all"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <Button
              variant="gooeyLeft"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-brand-primary text-white dark:text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-base mt-2"
            >
              {!isSubmitting ? null : (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              )}
              {!isSubmitting ? "Register" : "Creating your account..."}
            </Button>
          </form>
          <div className="flex py-6 gap-2 text-sm text-brand-text-muted justify-center border-t border-brand-dark-lighter/50 mt-8">
            <p>Already have an account? </p>
            <Link
              href={"/auth/login"}
              className="text-brand-primary font-semibold hover:text-brand-primary/80 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
