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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { DataTable } from "@/components/data-table";
import { conversionColumns } from "@/components/columns";
import { useQuery } from "@tanstack/react-query";
import { getSubCollectionDocuments } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";

const CoinConversion = () => {
  const { user } = useAuth();
  const { coinsData } = useCoinData();
  const [fromCoin, setFromCoin] = useState("");
  const [toCoin, setToCoin] = useState("");
  const [amount, setAmount] = useState(""); // Amount in USD
  const [loading, setLoading] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0); // Amount of ToCoin
  const [deductedAmount, setDeductedAmount] = useState(0); // Amount of FromCoin
  const [exchangeRate, setExchangeRate] = useState(0);
  const navigate = useNavigate();

  const { data: transactions } = useQuery({
    queryKey: ["user", user?.uid, "transactions"],
    queryFn: async () => {
      const documents = await getSubCollectionDocuments(
        "users",
        user.docRef,
        "transactions"
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
        toQty
      );

      if (result.success) {
        toast.success("Conversion successful");
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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Convert Coins</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-4 md:col-span-2">
          <CardHeader>
            <CardTitle>Conversion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromCoin} onValueChange={setFromCoin}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coin to convert from" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {availableWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      <div className="flex items-center gap-2">
                        <img
                          src={wallet.icon}
                          alt={wallet.name}
                          className="w-4 h-4"
                        />
                        {wallet.name} (Balance: $
                        {formatNumberWithCommas(user?.[wallet.value] || 0)})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>To</Label>
              <Select value={toCoin} onValueChange={setToCoin}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coin to convert to" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {allCoins
                    .filter((w) => w.id !== fromCoin)
                    .map((wallet) => (
                      <SelectItem key={wallet.id} value={wallet.id}>
                        <div className="flex items-center gap-2">
                          <img
                            src={wallet.icon}
                            alt={wallet.name}
                            className="w-4 h-4"
                          />
                          {wallet.name}
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Amount (USD)</Label>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {fromCoin && toCoin && (
              <div className="text-sm text-muted-foreground">
                {exchangeRate > 0 ? (
                  <>
                    Exchange Rate: 1{" "}
                    {wallets.find((w) => w.id === fromCoin)?.name} ={" "}
                    {exchangeRate.toFixed(6)}{" "}
                    {wallets.find((w) => w.id === toCoin)?.name}
                  </>
                ) : (
                  <span className="text-yellow-600">
                    Fetching exchange rate or price unavailable...
                  </span>
                )}
              </div>
            )}

            {deductedAmount > 0 && (
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">You Pay:</span>
                  <div className="text-right">
                    <span className="font-bold block">
                      ${formatNumberWithCommas(deductedAmount.toFixed(2))}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ≈{" "}
                      {getEstimatedQuantity(fromCoin, deductedAmount).toFixed(
                        8
                      )}{" "}
                      {wallets.find((w) => w.id === fromCoin)?.name}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">You Receive:</span>
                  <div className="text-right">
                    <span className="font-bold block">
                      ${formatNumberWithCommas(convertedAmount.toFixed(2))}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ≈{" "}
                      {getEstimatedQuantity(toCoin, convertedAmount).toFixed(8)}{" "}
                      {wallets.find((w) => w.id === toCoin)?.name}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleConvert}
              disabled={loading || !fromCoin || !toCoin || !amount}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Convert
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold tracking-tight">
            Recent Conversions
          </h3>
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/transactions?type=conversion")}
          >
            See more
          </Button>
        </div>
        <Card>
          <CardContent className="p-0">
            <DataTable
              columns={conversionColumns} // Just use conversion columns directly since we know the type
              conversionColumns={conversionColumns}
              data={recentConversions || []}
              hideFilters={true}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CoinConversion;
