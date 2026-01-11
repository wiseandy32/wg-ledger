import { useCoinData } from "@/context/auth/use-coin-data";
import { useTheme } from "@/context/theme-provider";
import { wallets } from "@/data";
import {
  formatNumberWithCommas,
  getSubCollectionDocuments,
} from "@/lib/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/auth/use-auth";
import TotalAssets from "./components/total-assets";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function UserDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { coinsData } = useCoinData();

  const { data: recentTransactions } = useQuery({
    queryKey: ["recentTransactions", user?.uid],
    queryFn: async () => {
      if (!user?.docRef) return [];
      const documents = await getSubCollectionDocuments(
        "users",
        user.docRef,
        "transactions"
      );
      // Sort desc by timestamp and take top 6
      return (documents || [])
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 6);
    },
    enabled: !!user?.docRef,
  });

  const mappedWallets = wallets.map((wallet) => {
    if (!user) {
      return wallet;
    }

    const amount = user[wallet.value];
    const totalBalance = amount ? wallet.balance + +amount : wallet.balance;

    const matchingCoin = coinsData?.find((coin) => coin.id === wallet.id);
    if (matchingCoin) {
      // totalBalance is the USD value from DB
      const coinAmount =
        matchingCoin.current_price > 0
          ? totalBalance / matchingCoin.current_price
          : 0;

      const walletData = {
        ...wallet,
        balance: totalBalance.toFixed(2),
        coinAmount: coinAmount,
      };

      if (totalBalance > 0) {
        walletData.last_1h_change_percentage = Number(
          matchingCoin.price_change_percentage_1h_in_currency
        ).toFixed(1);
      }

      return walletData;
    } else {
      return {
        ...wallet,
        balance: totalBalance,
        coinAmount: 0,
      };
    }
  });

  const coins = mappedWallets.filter((w) => w.id);
  const otherWallets = mappedWallets.filter((w) => !w.id);

  // Sort coins: active (balance > 0) first, then by balance descending
  coins.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance));

  const ledgerBalance = coins.reduce(
    (total, wallet) => total + +wallet.balance,
    0
  );

  const dashboardWallets = [...coins, ...otherWallets].filter((w) => {
    const effectiveBalance =
      w.name === "Ledger" ? ledgerBalance : parseFloat(w.balance);
    return effectiveBalance > 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-5xl font-bold capitalize premium-gradient-text w-fit">
          Welcome, {user?.name}
        </h1>
        <p className="text-muted-foreground text-sm md:text-base font-light tracking-wide">
          Here&apos;s an overview of your account and the latest cryptocurrency
          prices.
        </p>
        <TotalAssets balance={ledgerBalance.toFixed(2)} />
      </div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {dashboardWallets.map((wallet, index) => (
          <motion.div
            key={wallet?.name}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className={`glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group ${
              wallet?.name === "Ledger"
                ? "border-brand-primary/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                : ""
            }`}
          >
            <div className="relative z-10 flex items-start justify-between mb-8">
              <div
                className={`h-14 w-14 rounded-2xl grid place-content-center border border-black/5 dark:border-white/5 ${
                  wallet?.name?.includes("Ledger")
                    ? "bg-brand-primary/20 text-brand-primary"
                    : "bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-300"
                }`}
              >
                {!wallet?.name?.includes("Ledger") ? (
                  <img
                    src={wallet?.icon}
                    className={`w-8 h-8 object-contain opacity-90 ${
                      wallet.name === "ALGO"
                        ? "dark:brightness-0 dark:invert"
                        : ""
                    }`}
                    alt=""
                  />
                ) : (
                  <wallet.icon className="w-7 h-7" />
                )}
              </div>

              {wallet?.last_1h_change_percentage && (
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    wallet.last_1h_change_percentage < 0
                      ? "bg-red-500/10 text-red-500 border-red-500/20"
                      : "bg-green-500/10 text-green-500 border-green-500/20"
                  }`}
                >
                  {wallet.last_1h_change_percentage < 0 ? "" : "+"}
                  {wallet.last_1h_change_percentage}%
                </span>
              )}
            </div>

            <div className="relative z-10">
              <p className="text-muted-foreground text-sm font-medium tracking-wide mb-1">
                {wallet?.name}{" "}
                {!wallet?.name?.includes("Withdrawal") ? "Balance" : ""}
              </p>

              <p className="text-2xl font-bold tracking-tight text-foreground mb-2">
                <AnimatePresence mode="wait">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {`$${formatNumberWithCommas(
                      wallet.name === "Ledger"
                        ? ledgerBalance.toFixed(2)
                        : +wallet?.balance
                    )}`}
                  </motion.span>
                </AnimatePresence>
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  USD
                </span>
              </p>

              {!wallet?.name?.includes("Withdrawal") &&
                wallet.coinAmount > 0 && (
                  <p
                    className={`text-xs font-medium ${
                      wallet.last_1h_change_percentage < 0
                        ? "text-red-500"
                        : "text-brand-primary/80"
                    }`}
                  >
                    ≈ {Number(wallet.coinAmount).toFixed(6)} {wallet.name}
                  </p>
                )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="w-full glass-card rounded-2xl p-6 overflow-hidden space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            Recent Transactions
          </h2>
          <Link to="/user/transactions">
            <Button
              variant="ghost"
              className="text-brand-primary hover:text-brand-primary hover:bg-brand-primary/10 gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={recentTransactions || []}
          hideFilters={true}
          hidePagination={true}
        />
      </div>
    </motion.div>
  );
}

export default UserDashboard;
