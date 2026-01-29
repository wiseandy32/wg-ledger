"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth/use-auth";
import { useCoinData } from "@/context/auth/use-coin-data";
import { wallets } from "@/data";
import { convertCoin, formatNumberWithCommas } from "@/lib/helpers";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { conversionColumns } from "@/components/columns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSubCollectionDocuments } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const CoinConversion = () => {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { coinsData } = useCoinData();
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [amount, setAmount] = useState(""); // Amount in USD
  const [loading, setLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0); // Amount of ToCoin
  const [deductedAmount, setDeductedAmount] = useState(0); // Amount of FromCoin
  const [exchangeRate, setExchangeRate] = useState(0);
  const router = useRouter();

  const { data: transactions } = useQuery({
    queryKey: ["user", user?.uid],
    queryFn: async () => {
      const documents = await getSubCollectionDocuments(
        "users",
        user.docRef,
        "transactions",
      );
      return documents || [];
    },
    enabled: !!user,
  });

  const recentConversions = transactions
    ?.filter((t) => t.type === "conversion")
    ?.sort((a, b) => b.timestamp - a.timestamp)
    ?.slice(0, 5);

  // Filter wallets where user has balance > 0
  const availableWallets = wallets
    .filter((wallet) => {
      const balance = user?.[wallet.value] || 0;
      return balance > 0 && wallet.id;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const allCoins = wallets
    .filter((w) => w.id)
    .sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (fromCoin && toCoin && coinsData) {
      const fromCoinData = coinsData.find((c) => c.id === fromCoin);
      const toCoinData = coinsData.find((c) => c.id === toCoin);

      if (fromCoinData && toCoinData) {
        const rate = fromCoinData.current_price / toCoinData.current_price;
        setExchangeRate(rate);
      } else {
        setExchangeRate(0);
      }
    }
  }, [fromCoin, toCoin, coinsData]);

  useEffect(() => {
    if (amount && fromCoin && toCoin && coinsData) {
      const fromCoinData = coinsData.find((c) => c.id === fromCoin);
      const toCoinData = coinsData.find((c) => c.id === toCoin);

      if (fromCoinData && toCoinData) {
        const usdAmount = parseFloat(amount);
        setDeductedAmount(usdAmount);
        setConvertedAmount(usdAmount); // Value is preserved 1:1 in USD
      }
    } else {
      setConvertedAmount(0);
      setDeductedAmount(0);
    }
  }, [amount, fromCoin, toCoin, coinsData]);

  const handleConvert = async () => {
    if (!fromCoin || !toCoin || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    if (parseFloat(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    const fromWallet = wallets.find((w) => w.id === fromCoin);
    const toWallet = wallets.find((w) => w.id === toCoin);
    const userBalance = user?.[fromWallet.value] || 0;

    if (deductedAmount > userBalance) {
      toast.error(`Insufficient ${fromWallet.name} balance`);
      return;
    }

    setLoading(true);
    try {
      const fromQty = getEstimatedQuantity(fromCoin, deductedAmount);
      const toQty = getEstimatedQuantity(toCoin, convertedAmount);

      const result = await convertCoin(
        user.docRef,
        fromCoin,
        toCoin,
        deductedAmount, // USD amount to deduct
        convertedAmount, // USD amount to add
        exchangeRate,
        fromWallet.name,
        toWallet.name,
        fromWallet.value,
        toWallet.value,
        fromQty,
        toQty,
      );

      if (result.success) {
        toast.success("Conversion successful");
        qc.invalidateQueries({ queryKey: ["user", user?.uid] });
        qc.invalidateQueries({ queryKey: ["uid", user?.uid] });
        setAmount("");
        setFromCoin("");
        setToCoin("");
      } else {
        toast.error("Conversion failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Helper to calculate estimated coin quantity for display
  const getEstimatedQuantity = (coinId, usdValue) => {
    if (!coinsData || !coinId || !usdValue) return 0;
    const coin = coinsData.find((c) => c.id === coinId);
    return coin ? usdValue / coin.current_price : 0;
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold premium-gradient-text">
          Convert Coins
        </h2>
        <p className="text-muted-foreground">
          Instantly swap your assets between different cryptocurrencies with
          zero fees.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-4 md:col-span-2 glass-card p-8 space-y-8 rounded-2xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                From
              </Label>
              <Select value={fromCoin} onValueChange={setFromCoin}>
                <SelectTrigger className="py-6 glass-input">
                  <SelectValue placeholder="Select coin to convert from" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] glass-card border-border/50">
                  {availableWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={wallet.icon}
                          alt={wallet.name}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="font-medium">{wallet.name}</span>
                        <span className="text-xs text-muted-foreground opacity-70">
                          (Balance: $
                          {formatNumberWithCommas(user?.[wallet.value] || 0)})
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                To
              </Label>
              <Select value={toCoin} onValueChange={setToCoin}>
                <SelectTrigger className="py-6 glass-input">
                  <SelectValue placeholder="Select coin to convert to" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px] glass-card border-border/50">
                  {allCoins
                    .filter((w) => w.id !== fromCoin)
                    .map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={wallet.icon}
                            alt={wallet.name}
                            className="w-5 h-5 object-contain"
                          />
                          <span className="font-medium">{wallet.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">
                Amount (USD)
              </Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                className="py-6 glass-input text-lg font-semibold"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {fromCoin && toCoin && (
              <div className="p-3 rounded-xl bg-muted/30 border border-border/30 text-xs font-medium text-muted-foreground flex items-center gap-2">
                <Loader2 className="w-3 h-3 text-brand-primary animate-pulse" />
                {exchangeRate > 0 ? (
                  <>
                    Exchange Rate: 1{" "}
                    {wallets.find((w) => w.id === fromCoin)?.name} ={" "}
                    {exchangeRate.toFixed(6)}{" "}
                    {wallets.find((w) => w.id === toCoin)?.name}
                  </>
                ) : (
                  <span className="text-brand-primary">
                    Updating exchange rates...
                  </span>
                )}
              </div>
            )}

            {deductedAmount > 0 && (
              <div className="glass-card bg-muted/20 p-5 rounded-2xl space-y-4 border-border/30">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">
                    You Pay
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold block text-foreground tracking-tight">
                      ${formatNumberWithCommas(deductedAmount.toFixed(2))}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      ≈{" "}
                      {getEstimatedQuantity(fromCoin, deductedAmount).toFixed(
                        8,
                      )}{" "}
                      {wallets.find((w) => w.id === fromCoin)?.name}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-border/50" />

                <div className="flex justify-between items-start">
                  <span className="text-sm font-semibold text-muted-foreground uppercase tracking-tight">
                    You Receive
                  </span>
                  <div className="text-right">
                    <span className="text-xl font-bold block text-brand-primary tracking-tight">
                      ${formatNumberWithCommas(convertedAmount.toFixed(2))}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      ≈{" "}
                      {getEstimatedQuantity(toCoin, convertedAmount).toFixed(8)}{" "}
                      {wallets.find((w) => w.id === toCoin)?.name}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full h-12 text-base font-bold shadow-lg shadow-brand-primary/10"
              onClick={handleConvert}
              variant="gooeyLeft"
              disabled={loading || !fromCoin || !toCoin || !amount}
            >
              {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {loading ? "Processing..." : "Convert Assets"}
            </Button>
          </div>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight premium-gradient-text">
            Recent Conversions
          </h3>
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 text-xs font-semibold rounded-full border-border/50 hover:bg-muted/50 transition-all"
            onClick={() => router.push("/user/transactions?type=conversion")}
          >
            See more
          </Button>
        </div>
        <div className="glass-card rounded-2xl overflow-hidden overflow-x-auto">
          <DataTable
            columns={conversionColumns}
            conversionColumns={conversionColumns}
            data={recentConversions || []}
            hideFilters={true}
            hidePagination={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CoinConversion;
