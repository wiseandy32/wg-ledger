import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth/use-auth";
import { useCoinData } from "@/context/auth/use-coin-data";
import {
  addDataToSubCollection,
  getCurrentDate,
  formatNumberWithCommas,
} from "@/lib/helpers";
// import { auth } from "@/services/firebase";
import { addDataToDb } from "@/utils/auth";
import { Check, CopyIcon, Info } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import Modal from "react-responsive-modal";
import { Link, useLoaderData } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function GateWay() {
  const data = useLoaderData();
  const inputRef = useRef();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isHashModalOpen, setIsHashModalOpen] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");
  const [amountDeposited, setAmountDeposited] = useState("");
  const { user } = useAuth();
  const { coinsData } = useCoinData();
  const qc = useQueryClient();

  // Calculate transaction details
  const transactionDetails = useMemo(() => {
    const coin = (coinsData || []).find((c) => c.id === data.id);
    const rawPrice = coin?.current_price || 0;

    // For USDT, we force 2 decimals to maintain the 1:1 USD relationship ($1.00)
    // For all other coins, we use the raw live price for maximum precision
    const isUSDT = data.type?.toUpperCase() === "USDT";
    const precision = isUSDT ? 2 : 8; // Display at least 8 for others, or as many as available
    const displayPrice = isUSDT ? Number(rawPrice.toFixed(2)) : rawPrice;
    const amount = parseFloat(amountDeposited) || 0;

    return {
      price: rawPrice,
      displayPrice,
      precision,
      estimatedReceive:
        displayPrice > 0 ? (amount / displayPrice).toFixed(8) : "0.00000000",
      charge: "0.00",
    };
  }, [coinsData, data.id, data.type, amountDeposited]);

  const handleCopy = () => {
    const textToCopy = inputRef.current.value;
    if (textToCopy.trim()) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          toast.success("Wallet address copied to keyboard");
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
        });
    }
  };

  const handleOpenHashModal = (e) => {
    e.preventDefault();
    setIsHashModalOpen(true);
  };

  const validateHash = (hash) => {
    /**
     * Validates a crypto transaction hash in a chain-agnostic way.
     *
     * Rules:
     * - Must be a string
     * - Must represent at least 32 bytes (256 bits)
     * - Supports hex (with or without 0x), Base58, and Base64
     */
    if (typeof hash !== "string") return false;

    const value = hash.trim();
    if (!value) return false;

    // HEX (with optional 0x prefix)
    const hex = value.startsWith("0x") ? value.slice(2) : value;
    if (/^[0-9a-fA-F]+$/.test(hex)) {
      return hex.length >= 64 && hex.length % 2 === 0;
    }

    // Base64 (standard or URL-safe, with optional padding)
    if (/^[A-Za-z0-9+/=_-]+$/.test(value)) {
      try {
        const bytes = Buffer.from(value, "base64");
        return bytes.length >= 32;
      } catch {
        return false;
      }
    }

    // Base58 (Bitcoin-style alphabet)
    const BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]+$/;
    if (BASE58_REGEX.test(value)) {
      // 32 bytes ≈ 43–44 Base58 chars minimum
      return value.length >= 43;
    }

    return false;
  };

  const handleFinalSubmit = async () => {
    if (!transactionHash.trim() || !validateHash(transactionHash)) {
      toast.error("Invalid transaction hash.");
      return;
    }

    const depositRequestInfo = {
      uid: user.uid,
      userDocRef: user.docRef,
      method: data.value,
      timestamp: Date.now(),
      coin: data.type,
      name: user.displayName,
      amount: parseFloat(amountDeposited),
      email: user.email,
      isConfirmed: false,
      transactionHash: transactionHash.trim(),
    };

    try {
      const depositID = await addDataToDb(
        "depositRequests",
        depositRequestInfo
      );

      await addDataToSubCollection("users", user.docRef, "transactions", {
        id: depositID,
        coin: data.type,
        type: "deposit",
        amount: parseFloat(amountDeposited),
        status: "pending",
        userDocRef: user.docRef,
        timestamp: Date.now(),
        creationDate: getCurrentDate(),
        transactionHash: transactionHash.trim(),
      });

      setAmountDeposited("");
      setIsHashModalOpen(false);
      setIsSuccessModalOpen(true);
      qc.invalidateQueries({ queryKey: ["uid", user?.uid] });
      qc.invalidateQueries({ queryKey: ["user", user?.uid] });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit deposit request");
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold premium-gradient-text capitalize">
          {data.type} {data?.extra} Gateway
        </h1>
        <p className="mt-2 text-muted-foreground">
          Scan the QR code or copy the {data.type} address to make your deposit
        </p>
      </div>
      <form
        className="w-full max-w-[680px] glass-card p-8 space-y-8 rounded-2xl"
        onSubmit={handleOpenHashModal}
      >
        <div className="flex items-center gap-2 pb-4 border-b border-border/50">
          <img src={data.icon} alt="" width={32} className="object-contain" />
          <p className="uppercase font-bold tracking-wider text-lg">
            {data.type} {data?.extra}
          </p>
        </div>

        <div className="flex justify-center py-4 rounded-xl">
          <img
            src={data.qrCode}
            alt="QR Code"
            width={280}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="grid w-full items-center gap-3 relative">
          <Label
            htmlFor="walletAddress"
            className="text-sm font-medium text-muted-foreground uppercase tracking-tight"
          >
            {data.type} Address
          </Label>
          <div className="relative">
            <Input
              type="text"
              id="walletAddress"
              value={data?.walletAddress}
              ref={inputRef}
              readOnly
              className="pr-36 py-6 glass-input font-mono text-sm"
            />
            <Button
              className="absolute right-1 top-1 bottom-1 px-4"
              onClick={handleCopy}
              type="button"
            >
              <CopyIcon className="mr-2 w-4 h-4" /> Copy
            </Button>
          </div>
          {data?.extra && (
            <p className="text-xs text-muted-foreground">
              Network type:{" "}
              <span className="text-foreground font-semibold">
                {data?.extra}
              </span>
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-3 pt-4 border-t border-border/50">
          <Label
            htmlFor="depositAmount"
            className="text-sm font-medium text-muted-foreground uppercase tracking-tight"
          >
            Deposit Amount ($)
          </Label>
          <Input
            type="number"
            id="depositAmount"
            name="depositAmount"
            placeholder="Enter the amount you sent"
            className="py-6 glass-input"
            value={amountDeposited}
            onChange={(e) => setAmountDeposited(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-foreground font-semibold">
            <Info className="w-4 h-4 text-brand-primary" />
            <span>Transaction Details</span>
          </div>
          <div className="glass-card bg-muted/30 p-4 rounded-xl space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Charge</span>
              <span className="font-medium">${transactionDetails.charge}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span className="font-medium">
                1 {data.type.toUpperCase()} = $
                {transactionDetails.displayPrice.toFixed(
                  transactionDetails.precision
                )}
              </span>
            </div>
            <div className="flex justify-between items-center border-t border-border/30 pt-2 mt-2">
              <span className="text-muted-foreground font-medium">
                You will receive
              </span>
              <span className="font-bold text-foreground text-base">
                {(() => {
                  const val = transactionDetails.estimatedReceive;
                  const parts = val.split(".");
                  const formattedInt = formatNumberWithCommas(parts[0]);
                  return parts.length > 1
                    ? `${formattedInt}.${parts[1]}`
                    : formattedInt;
                })()}{" "}
                {data.type.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <Button
          className="w-full h-12 text-base font-semibold transition-all hover:scale-[1.02]"
          type="submit"
          variant="gooeyLeft"
        >
          I've Made the Deposit
        </Button>
      </form>

      {/* Transaction Hash Modal */}
      <Modal
        classNames={{
          modal:
            "customModal glass-card p-0 overflow-hidden rounded-2xl border-none shadow-2xl !m-0 !relative !z-[60]",
          root: "!bg-transparent !flex !items-center !justify-center !fixed !inset-0 !overflow-hidden !z-50 !p-4",
          overlay: "!bg-black/60 !backdrop-blur-sm !fixed !inset-0 !z-40",
        }}
        open={isHashModalOpen}
        onClose={() => setIsHashModalOpen(false)}
      >
        <div className="p-6 sm:p-8 space-y-6 w-full sm:w-[480px] h-auto sm:h-[380px] flex flex-col justify-between max-w-[95vw]">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold premium-gradient-text">
              Confirm Transaction
            </h3>
            <p className="text-muted-foreground text-sm">
              Please provide the transaction hash or ID of your deposit for
              verification.
            </p>
          </div>

          <div className="space-y-3">
            <Label
              htmlFor="txHash"
              className="text-xs font-bold uppercase tracking-widest opacity-60"
            >
              Transaction Hash
            </Label>
            <Input
              id="txHash"
              placeholder="Enter Transaction Hash"
              className="py-6 glass-input font-mono text-sm w-full break-all"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
            />
            <p className="text-[10px] text-muted-foreground italic flex items-center gap-1">
              <Info className="w-3 h-3" />
              Ensure the hash is correct to avoid processing delays.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <Button
              onClick={handleFinalSubmit}
              className="w-full h-12 font-bold shadow-lg shadow-brand-primary/20"
              variant="gooeyLeft"
            >
              Submit for Verification
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsHashModalOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        classNames={{
          modal:
            "customModal glass-card rounded-2xl p-8 max-w-sm !m-0 !relative !z-[60]",
          root: "!bg-transparent !flex !items-center !justify-center !fixed !inset-0 !overflow-hidden !z-50 !p-4",
          overlay: "!bg-black/60 !backdrop-blur-sm !fixed !inset-0 !z-40",
        }}
        open={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setTransactionHash("");
        }}
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
              DEPOSIT SUBMITTED
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed px-2">
              Your deposit request with hash
              <span className="font-mono text-xs block mt-1 text-foreground bg-muted/50 p-1 rounded">
                {transactionHash?.slice(0, 10)}...{transactionHash?.slice(-10)}
              </span>
              is being processed. You'll be notified once confirmed.
            </p>
          </div>

          <Button
            variant="gooeyRight"
            className="w-full h-11"
            onClick={() => (window.location.href = "/user")}
          >
            Return to Dashboard
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default GateWay;
