"use client";

import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth/use-auth";
import { updateFirebaseDb } from "@/lib/helpers";
import { setDataToDb } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import RegionSelect from "@/components/region-select";

function CompleteProfile() {
  const { user, uid } = useContext(AuthContext);
  const router = useRouter();
  const qc = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayPicture, setDisplayPicture] = useState("");
  const [region, setRegion] = useState(user?.region || "");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setDisplayPicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      setIsSubmitting(true);

      const profileData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        address: formData.get("address"),
        region: region,
        zipCode: formData.get("zipCode"),
        city: formData.get("city"),
        displayName: `${formData.get("firstName")} ${formData.get("lastName")}`,
        isAccountVerified: true,
      };

      if (displayPicture) {
        profileData.photo = displayPicture;
      }

      await setDataToDb("users", user.docRef, profileData);

      toast.success("Profile completed successfully!");
      qc.invalidateQueries({ queryKey: ["uid", uid] });
      router.push("/user");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen pt-20 pb-20 flex items-center justify-center bg-slate-50 dark:bg-brand-dark px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-brand-dark-lighter/30 backdrop-blur-sm border border-gray-200 dark:border-brand-dark-lighter/50 p-8 rounded-3xl shadow-xl">
          <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/20 rounded-2xl flex gap-3 text-left">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-800 dark:text-amber-200 font-medium text-sm leading-relaxed">
              You need to complete your profile to get access to your dashboard
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  placeholder="Enter first name"
                  className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
                >
                  Last Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  placeholder="Enter last name"
                  className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
              >
                Image
              </label>
              <div className="relative">
                <Input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
              >
                Address
              </label>
              <Input
                type="text"
                id="address"
                name="address"
                placeholder="Enter address"
                className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="state"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
                >
                  Region
                </label>
                <RegionSelect
                  countryName={user?.country}
                  value={region}
                  onChange={(value) => setRegion(value)}
                  placeholder="Select your region"
                  className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="zipCode"
                  className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
                >
                  Zip Code
                </label>
                <Input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Enter zip code"
                  className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
              >
                City
              </label>
              <Input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                className="h-12 bg-slate-50 dark:bg-brand-dark-lighter/50 border-gray-300 dark:border-brand-dark-lighter rounded-xl"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-brand-dark dark:bg-brand-primary text-white dark:text-brand-dark font-bold hover:shadow-lg transition-all rounded-xl text-base mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Updating profile...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CompleteProfile;
