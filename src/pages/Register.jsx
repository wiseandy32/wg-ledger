import { Link } from "react-router-dom";
import { registrationFormField } from "../data";
import { useState, useEffect } from "react";
import { addDataToDb, createUser, updateUserProfile } from "../utils/auth";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import MessageCard from "./components/MessageCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";

function Register() {
  const [error, setError] = useState("");
  const [isVerificationLinkSent, setIsVerificationLinkSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setIsSubmitting(true);
      // create a new user
      await createUser(
        formData.get("email"),
        formData.get("password"),
        setError
      );
      // update user displayName
      await updateUserProfile({
        displayName: `${formData.get("firstName")} ${formData.get("lastName")}`,
      });

      const uid = auth.currentUser.uid;
      const verificationToken = uuidv4();

      const user = {
        name: auth.currentUser.displayName,
        username: formData.get("username"),
        email: auth.currentUser.email,
        uid,
        isDeleted: false,
        isAdmin: false,
        isAccountVerified: false,
        verificationToken,
        verificationTokenCreatedAt: serverTimestamp(),
      };

      const ref = await addDataToDb("users", user);
      const verificationLink = `${window.location.origin}/verify/${ref}?token=${verificationToken}`;

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REGISTER,
        {
          subject: "Email Verification",
          User_name: `${user.name}`,
          verification_link: `${verificationLink}`,
          send_to: `${user.email}`,
          company_name: "Quantum Assets Ledger",
        }
      );

      // sign the user out, so they can login manually
      await signOut(auth);

      setIsVerificationLinkSent(true);
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
    <section className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      {!isVerificationLinkSent ? (
        <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
          <div className="bg-brand-dark-lighter/30 backdrop-blur-sm border border-brand-dark-lighter/50 p-8 rounded-3xl shadow-xl">
            <form
              className="flex flex-col gap-6"
              onSubmit={async (e) => await onSubmit(e)}
              id="registrationForm"
            >
              <div className="text-center">
                <h1 className="font-bold text-4xl sm:text-5xl tracking-tight text-white mb-2">
                  Create an account
                </h1>
                <p className="text-brand-text-muted text-sm">
                  Join the world's most secure decentralized ledger
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
                      pattern={field?.pattern}
                      title={field?.title}
                      minLength={field?.min}
                      onBlur={
                        field.name !== "confirmPassword"
                          ? null
                          : (e) => {
                              const password =
                                e.target.parentElement.previousSibling.lastChild
                                  .value;
                              if (password !== e.target.value) {
                                setError(
                                  "Passwords do not match. Please ensure both fields are identical"
                                );
                              } else {
                                setError("");
                              }
                            }
                      }
                      className="h-12 bg-brand-dark-lighter/50 border-brand-dark-lighter text-white placeholder:text-brand-text-muted/30 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl transition-all"
                    />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 pl-1">
                <input
                  type="checkbox"
                  name="hasAcceptedTerms"
                  id="hasAcceptedTerms"
                  required
                  className="w-4 h-4 rounded border-brand-dark-lighter/50 bg-brand-dark-lighter/30 text-brand-primary focus:ring-brand-primary/20"
                />
                <label
                  htmlFor="hasAcceptedTerms"
                  className="text-sm text-brand-text-muted"
                >
                  I accept the{" "}
                  <span className="text-brand-primary hover:text-brand-primary/80 cursor-pointer transition-colors">
                    terms
                  </span>{" "}
                  and{" "}
                  <span className="text-brand-primary hover:text-brand-primary/80 cursor-pointer transition-colors">
                    privacy policy
                  </span>
                </label>
              </div>
              <Button
                variant="gooeyLeft"
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-brand-primary text-brand-dark font-bold hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-xl text-base mt-2"
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
                to={"/login"}
                className="text-brand-primary font-semibold hover:text-brand-primary/80 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <MessageCard
          title={"Verification email sent"}
          subtext={
            "We have sent a verification link to your registered email address. Please check your inbox."
          }
          cta={"Login"}
          to={"/login"}
        />
      )}
    </section>
  );
}

export default Register;
