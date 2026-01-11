import { Link } from "react-router-dom";
import { loginFormFields } from "../data";

import { useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getSingleDocument } from "@/lib/helpers";

function Login() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

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

      if (!user.emailVerified) {
        if (!userDoc?.isAccountVerified) {
          signOut(auth);
          setIsSubmitting(false);
          setError("Email verification is required. Please verify your email.");
          return;
        }
      }

      navigate(!state ? "/user" : state.from);
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
    <section className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <div className="bg-brand-dark-lighter/30 backdrop-blur-sm border border-brand-dark-lighter/50 p-8 rounded-3xl shadow-xl">
          <form className="flex flex-col gap-6" onSubmit={(e) => login(e)}>
            <div className="text-center">
              <h1 className="font-bold text-4xl sm:text-5xl tracking-tight text-white mb-2">
                Welcome back!
              </h1>
              <p className="text-brand-text-muted text-sm">
                Sign in to access your secure ledger
              </p>
            </div>

            {!error ? null : (
              <p className="text-white bg-red-500/10 border border-red-500/20 w-full p-3 rounded-xl font-medium text-sm text-red-500 flex items-center gap-2">
                <span className="block w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </p>
            )}
            <div className="flex flex-col gap-5">
              {loginFormFields.map((field) => (
                <div className="flex flex-col gap-2" key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="capitalize text-sm font-medium text-brand-text-muted pl-1"
                  >
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    placeholder={field?.placeholder}
                    required
                    id={field.name}
                    name={field.name}
                    className="h-12 bg-brand-dark-lighter/50 border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl transition-all"
                  />
                </div>
              ))}
            </div>
            <Link
              to={"forgot-password"}
              className="self-end text-brand-primary hover:text-brand-primary/80 transition-colors text-sm font-medium"
            >
              Forgot password?
            </Link>
            <Button
              variant="gooeyLeft"
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-brand-primary text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-base mt-2"
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
              to={"/register"}
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
