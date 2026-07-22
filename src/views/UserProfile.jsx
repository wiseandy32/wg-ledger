"use client";
import CountrySelect from "@/components/country-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/use-auth";
import { useRef } from "react";
import {
  capitalizeFirstLettersOfName,
  processData,
  updateFirebaseDb,
} from "@/lib/helpers";
import { getProfileImage, saveProfileImage } from "@/lib/image-store";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import RegionSelect from "@/components/region-select";
import PasswordChangeSection from "@/components/password-change-section";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

function UserProfile() {
  const { user } = useAuth();
  const [country, setCountry] = useState(user?.country || "");
  const [countryRegion, setCountryRegion] = useState(user?.region || "");
  const [isNotEditing, setIsNotEditing] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
  const [count, setCount] = useState(0);
  const qc = useQueryClient();

  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [displayPicture, setDisplayPicture] = useState("");
  const [imageError, setImageError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [stagedImageFile, setStagedImageFile] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;
    let revokeUrl = null;
    getProfileImage(user.uid).then((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        revokeUrl = url;
        setDisplayPicture(url);
      }
    });
    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [user?.uid]);

  const handleSubmit = async () => {
    if (stagedImageFile) {
      await saveProfileImage(user.uid, stagedImageFile);
      setStagedImageFile(null);
    }

    const newProfileDetails = {
      phone: phoneNumber,
      country: country,
      region: countryRegion,
      walletAddress: walletAddress,
    };

    const currentProfileDetails = {
      phone: user?.phone,
      country: user?.country,
      region: user?.region,
      walletAddress: user?.walletAddress,
    };

    const updatedProfileDetails = processData(
      newProfileDetails,
      currentProfileDetails,
    );

    if (updatedProfileDetails) {
      await updateFirebaseDb("users", user.docRef, updatedProfileDetails);
    }
    qc.invalidateQueries({ queryKey: ["uid"] });
    toast.success("Profile updated successfully.");
  };

  const handleCancel = async () => {
    setIsNotEditing(true);
    setIsTouched(false);
    setStagedImageFile(null);
    setImageError("");
    setPhoneNumber("");
    setWalletAddress("");
    setCountry(user?.country || "");
    setCountryRegion(user?.region || "");
    const blob = await getProfileImage(user.uid);
    if (blob) {
      setDisplayPicture(URL.createObjectURL(blob));
    } else {
      setDisplayPicture("");
    }
  };

  const handleFileChange = (e) => {
    if (isNotEditing) return;
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      setImageError("Image must be 1MB or smaller");
      e.target.value = "";
      return;
    }
    setImageError("");
    setStagedImageFile(file);
    setIsTouched(true);
    setDisplayPicture(URL.createObjectURL(file));
  };

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">
          {/* <h1 className="text-4xl font-bold border-b-2 border-solid border-sidebar-border"> */}
          Profile
        </h1>
      </div>
      <div className="bg-muted/50 p-5 rounded-md">
        <div className="flex items-center gap-2">
          <Avatar
            className={`w-14 h-14 object-contain object-center ${
              isNotEditing === false && "cursor-pointer"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <AvatarImage
              className="object-contain object-center"
              src={displayPicture}
            />
            <AvatarFallback>
              {capitalizeFirstLettersOfName(user?.name)}
            </AvatarFallback>
          </Avatar>
          <input
            className="hidden"
            type="file"
            id="avatar"
            accept="image/png, image/jpeg, image/webp"
            name="avatar"
            ref={fileInputRef}
            disabled={isNotEditing}
            onChange={handleFileChange}
          />
          <div className="mr-2 text-sm grid gap-1">
            <p className="font-extrabold">{user?.displayName}</p>
            <p className="text-slate-400">@{user?.username}</p>
          </div>
          <div className="ml-auto flex gap-2">
            {!isNotEditing && (
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
          <Button
            onClick={() => {
              setIsNotEditing((prev) => !prev);
              setCount((prev) => prev + 1);
              const currentCount = count + 1;
              if (currentCount % 2 === 0 && isTouched) {
                handleSubmit();
              }
            }}
          >
            {isNotEditing ? "Edit" : "Update"}
          </Button>
        </div>
        </div>
        {imageError && (
          <p className="text-sm text-red-600 dark:text-red-400 mt-2">{imageError}</p>
        )}
        {!isNotEditing && (
          <p className="text-xs text-muted-foreground mt-1">
            Max file size: 1MB. PNG, JPEG, or WebP.
          </p>
        )}
      </div>
      <form ref={formRef}>
        <fieldset className="bg-muted/50 rounded-md">
          <h3 className="p-5 mb-5 border-b-2 border-solid border-sidebar-border">
            Personal Information
          </h3>
          <div className="px-5 pb-5 grid md:grid-cols-2 gap-y-4 items-center">
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-1 md:col-end-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                type="text"
                id="fullName"
                placeholder="Full name"
                value={user?.displayName || ""}
                disabled
                readOnly
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                placeholder="Username"
                value={user?.username || ""}
                readOnly
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 col-start-1 col-end-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={user?.email || ""}
                readOnly
                disabled
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Type your phone number"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                  }
                  setPhoneNumber(e.target.value);
                }}
                value={user?.phone || phoneNumber}
                disabled={isNotEditing}
              />
            </div>
          </div>
        </fieldset>
        <fieldset
          className="mt-5 bg-muted/50 rounded-md"
          disabled={isNotEditing}
        >
          <h3 className="p-5 mb-5 border-b-2 border-solid border-sidebar-border">
            Account Information
          </h3>
          <div className="px-5 pb-5 grid md:grid-cols-2 gap-4 gap-x-7 items-center">
            <div className="grid w-full items-center gap-1.5 md:col-start-1 md:col-end-2">
              <Label htmlFor="country">Country</Label>
              <CountrySelect
                value={country || user?.country}
                onChange={(value) => {
                  setIsTouched(true);
                  setCountry(value);
                }}
                placeholder="Select your country"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 md:col-start-2 md:col-end-3">
              <Label htmlFor="countryRegion">Region</Label>
              <RegionSelect
                countryName={country || user?.country}
                value={countryRegion || user?.region}
                onChange={(value) => {
                  setIsTouched(true);
                  setCountryRegion(value);
                }}
                placeholder="Select your region"
              />
            </div>
            <div className="grid w-full items-center gap-1.5 md:col-span-full">
              <Label htmlFor="wallet">Wallet Address</Label>
              <Input
                type="text"
                id="walletAddress"
                name="walletAddress"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setIsTouched(true);
                  }
                  setWalletAddress(e.target.value);
                }}
                value={walletAddress || user?.walletAddress}
                placeholder="Enter your wallet address"
                className="w-full"
              />
            </div>
          </div>
        </fieldset>
        <PasswordChangeSection email={user?.email} />
      </form>
    </>
  );
}

export default UserProfile;
