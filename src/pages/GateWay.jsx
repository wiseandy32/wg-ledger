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
  const [isOpen, setIsOpen] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOpen(true);
    const formData = new FormData(e.target);
    const depositRequestInfo = {
      uid: user.uid,
      userDocRef: user.docRef,
      method: data.value,
      timestamp: Date.now(),
      coin: data.type,
      name: user.displayName,
      amount: +formData.get("depositAmount"),
      email: user.email,
      isConfirmed: false,
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
        amount: +formData.get("depositAmount"),
        status: "pending",
        userDocRef: user.docRef,
        timestamp: Date.now(),
        creationDate: getCurrentDate(),
      });

      setAmountDeposited("");
      qc.invalidateQueries({ queryKey: ["uid", user?.uid] });
      qc.invalidateQueries({ queryKey: ["user", user?.uid] });
    } catch (error) {
      console.error(error);
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
        onSubmit={(e) => handleSubmit(e)}
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
                  console.log(val);
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
          Confirm Deposit
        </Button>
      </form>
      <Modal
        classNames={{
          //   overlay: "customModal",
          modal: "customModal",
          root: "bg-[rgba(0,_0,_0,_0.8)] grid place-content-center",
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="grid place-items-center gap-4 text-center">
          <div className="border-solid border-2 border-green-600 w-20 h-20 grid place-content-center rounded-full">
            <Check color="#16a34a" width={"3rem"} height={"3rem"} />
          </div>
          <p className="font-semibold text-2xl">DEPOSIT RECEIVED</p>
          <p className="">
            Your deposit has been successfully received and is being processed.
            You will be notified once the transaction is confirmed.
          </p>
          <Button variant="gooeyRight">
            <Link to="/user">Go to dashboard</Link>
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default GateWay;
