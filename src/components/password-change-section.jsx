"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { auth } from "@/services/firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Loader2 } from "lucide-react";

function PasswordChangeSection({ email }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  const resetState = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setError("");
    setIsDisabled(true);
    setIsUpdating(false);
  };

  const handleCancel = () => {
    resetState();
  };

  return (
    <div className="mt-5">
      <div className="bg-muted/50 p-5 rounded-md flex items-center gap-2 border-b-2 border-solid border-sidebar-border">
        <h3>Change Password</h3>
        <div className="ml-auto flex gap-2">
          {!isDisabled && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            onClick={async (e) => {
              e.stopPropagation();

              if (!isDisabled) {
                if (!currentPassword || !newPassword || !confirmNewPassword) {
                  setError("All password fields are required");
                  return;
                }

                if (newPassword.length < 6) {
                  setError("Password must be at least 6 characters");
                  return;
                }

                if (newPassword !== confirmNewPassword) {
                  setError(
                    "Passwords do not match. Please ensure both fields are identical",
                  );
                  return;
                }

                if (newPassword === currentPassword) {
                  setError(
                    "New password must be different from current password",
                  );
                  return;
                }

                try {
                  setIsUpdating(true);
                  setError("");

                  const credential = EmailAuthProvider.credential(
                    email,
                    currentPassword,
                  );
                  await reauthenticateWithCredential(
                    auth.currentUser,
                    credential,
                  );
                  await updatePassword(auth.currentUser, newPassword);

                  toast.success("Password updated successfully");
                  resetState();
                } catch (error) {
                  console.error(error);
                  if (error.code === "auth/wrong-password") {
                    setError("Current password is incorrect");
                  } else if (error.code === "auth/invalid-credential") {
                    setError("Invalid credentials. Please check your current password and try again.");
                  } else {
                    setError("Failed to update password. Please try again.");
                  }
                  setIsUpdating(false);
                }
                return;
              }

              setIsDisabled(false);
              setError("");
            }}
          >
            {!isUpdating ? null : (
              <Loader2 className="animate-spin mr-2" />
            )}

            {isDisabled
              ? "Edit"
              : !isUpdating
                ? "Submit"
                : "Submitting"}
          </Button>
        </div>
      </div>
      <fieldset
        className="bg-muted/50 rounded-md"
        disabled={isDisabled}
      >
        <div className="px-5 pb-5 pt-5 grid md:grid-cols-2 gap-4 items-center">
          <div className="flex flex-col gap-1 md:col-start-1 md:col-end-2">
            <label
              htmlFor="currentPassword"
              className="capitalize text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
            >
              Current Password
            </label>
            <Input
              type="password"
              placeholder="Type your current password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              id="currentPassword"
              name="currentPassword"
              minLength={6}
              className="py-5"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-start-2 md:col-end-3">
            <label
              htmlFor="newPassword"
              className="capitalize text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
            >
              New Password
            </label>
            <Input
              type="password"
              placeholder="Type your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              name="newPassword"
              minLength={6}
              className="py-5"
            />
          </div>
          <div className="flex flex-col gap-1 md:col-start-1 md:col-end-2">
            <label
              htmlFor="confirmNewPassword"
              className="capitalize text-sm font-medium text-gray-700 dark:text-gray-200 pl-1"
            >
              Confirm new Password
            </label>
            <Input
              type="password"
              placeholder="Type your new password again"
              required
              value={confirmNewPassword}
              id="confirmNewPassword"
              name="confirmPassword"
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              minLength={6}
              className="py-5"
            />
          </div>
          {!error ? null : (
            <p className="bg-red-500/10 border border-red-500/20 w-full p-2 rounded-xl font-medium text-sm text-red-600 dark:text-red-400 flex items-center gap-2 md:col-span-2">
              <span className="block w-1.5 h-1.5 rounded-full bg-red-600 dark:bg-red-400"></span>
              {error}
            </p>
          )}
        </div>
      </fieldset>
    </div>
  );
}

export default PasswordChangeSection;
