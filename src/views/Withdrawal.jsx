"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/auth/use-auth";
import { withdrawalOptions } from "@/data";
import { addDataToSubCollection, getCurrentDate } from "@/lib/helpers";
import { auth } from "@/services/firebase";
import { addDataToDb } from "@/utils/auth";
import { useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import { Check } from "lucide-react";
import { useState } from "react";
import Modal from "react-responsive-modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Withdrawal() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = new FormData(e.target);
      const availableBalance = user[formData.get("WithdrawalMethod")];
      const withdrawalMethod = formData.get("WithdrawalMethod").split("_");

      if (!availableBalance || +formData.get("amount") > +availableBalance) {
        setErrorMessage(
          "Insufficient funds. The requested amount exceeds your available balance for this method.",
        );
        setIsSubmitting(false);
        return;
      }

      const withdrawalRequestInfo = {
        uid: auth.currentUser.uid,
        method: formData.get("WithdrawalMethod"),
        coin: withdrawalMethod[0],
        userDocRef: user.docRef,
        name: auth.currentUser.displayName,
        amount: +formData.get("amount"),
        timestamp: Date.now(),
        walletAddress: formData.get("walletAddress"),
        email: auth.currentUser.email,
        isConfirmed: false,
      };

      const getMethod = () => {
        let method = "";
        withdrawalOptions.filter((option) => {
          if (option.value === formData.get("WithdrawalMethod")) {
            method = option.title;
          }
        });

        return method;
      };
      const withdrawalID = await addDataToDb(
        "withdrawalRequests",
        withdrawalRequestInfo,
      );

      await addDataToSubCollection("users", user.docRef, "transactions", {
        id: withdrawalID,
        userDocRef: user.docRef,
        coin: getMethod(),
        type: "withdrawal",
        amount: +formData.get("amount"),
        status: "pending",
        timestamp: Date.now(),
        creationDate: getCurrentDate(),
      });

      setIsOpen(true);
      setIsSubmitting(false);
      setErrorMessage("");
      e.target.reset();
      qc.invalidateQueries({ queryKey: ["uid", auth.currentUser?.uid] });
      qc.invalidateQueries({ queryKey: ["user", auth.currentUser?.uid] });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setErrorMessage(
        "An unexpected error occurred while processing your withdrawal. Please try again later or contact support.",
      );
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold premium-gradient-text">
          Withdrawal Request
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please fill the form below to request a withdrawal
        </p>
      </div>

      <form
        className="w-full max-w-[680px] glass-card p-8 space-y-8 rounded-2xl"
        onSubmit={(e) => handleSubmit(e)}
      >
        {errorMessage && (
          <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/20 p-4 rounded-xl">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-destructive font-medium">
              {errorMessage}
            </p>
          </div>
        )}

        <div className="grid w-full items-center gap-3">
          <Label
            htmlFor="amount"
            className="text-sm font-medium text-muted-foreground uppercase tracking-tight"
          >
            Amount ($)
          </Label>
          <Input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter withdrawal amount"
            min={10}
            className="py-6 glass-input"
            required
          />
          <p className="text-xs text-muted-foreground">
            Minimum withdrawal amount: $10
          </p>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label
            htmlFor="WithdrawalMethod"
            className="text-sm font-medium text-muted-foreground uppercase tracking-tight"
          >
            Withdrawal Method
          </Label>
          <Select id="WithdrawalMethod" name="WithdrawalMethod" required>
            <SelectTrigger className="py-6 glass-input">
              <SelectValue placeholder="Select a Wallet" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Withdrawal Method</SelectLabel>
                {withdrawalOptions.map((option) => (
                  <SelectItem key={option.title} value={option.value}>
                    {option.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full items-center gap-3">
          <Label
            htmlFor="walletAddress"
            className="text-sm font-medium text-muted-foreground uppercase tracking-tight"
          >
            Wallet Address
          </Label>
          <Input
            type="text"
            id="walletAddress"
            name="walletAddress"
            placeholder="Enter your wallet address"
            className="py-6 glass-input font-mono text-sm"
            required
          />
          <p className="text-xs text-muted-foreground">
            Double-check your wallet address to avoid loss of funds
          </p>
        </div>

        <Button
          disabled={isSubmitting}
          variant="gooeyLeft"
          className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02]"
        >
          {isSubmitting && <Loader2 className="animate-spin mr-2 w-5 h-5" />}
          {isSubmitting ? "Processing..." : "Submit Withdrawal Request"}
        </Button>
      </form>

      <Modal
        classNames={{
          modal:
            "customModal glass-card rounded-2xl p-8 max-w-sm !m-0 !relative !z-[60]",
          root: "!bg-transparent !flex !items-center !justify-center !fixed !inset-0 !overflow-hidden !z-50 !p-4",
          overlay: "!bg-black/60 !backdrop-blur-sm !fixed !inset-0 !z-40",
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="grid place-items-center gap-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
            <div className="relative border-2 border-green-500 w-20 h-20 grid place-content-center rounded-full bg-background/50 backdrop-blur-md">
              <Check className="text-green-500 w-10 h-10" strokeWidth={3} />
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-bold text-2xl tracking-tight">
              WITHDRAWAL INITIATED
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed px-2">
              Your withdrawal request has been successfully received and is
              being processed. You'll be notified once it's approved.
            </p>
          </div>

          <Button
            variant="gooeyRight"
            className="w-full h-11"
            onClick={() => router.push("/user")}
          >
            Return to Dashboard
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Withdrawal;
