import { useCoinData } from "@/context/auth/use-coin-data";
import { useTheme } from "@/context/theme-provider";
import { wallets } from "@/data";
import { formatNumberWithCommas, getActiveWallets } from "@/lib/helpers";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useAuth } from "@/context/auth/use-auth";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import TotalAssets from "./components/total-assets";

function UserDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { coinsData } = useCoinData();

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

  const dashboardWallets = [...coins, ...otherWallets];

  const ledgerBalance = coins.reduce(
    (total, wallet) => total + +wallet.balance,
    0
  );

  return (
    <>
      <div className="">
        <h1 className="text-2xl md:text-4xl font-bold capitalize">
          Welcome, {user?.name}
        </h1>
        <p className="md:mt-2 text-sm">
          Here&apos;s an overview of your account and the latest crypto currency
          prices.
        </p>
        <TotalAssets balance={ledgerBalance.toFixed(2)} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10 mt-3">
        {dashboardWallets.map((wallet, index) => (
          <div
            key={wallet?.name}
            className={`md:col-start-[${index + 1}] md:col-end-[${
              index + 3
            }] bg-muted/50 hover:bg-dashboard-card-bg-hover flex gap-6 min-w-[200px] items-center  p-4 rounded-sm shadow-[0_.5rem_1rem_rgba(255,_255,_255,_0.15)]"
          `}
          >
            <div
              className={`h-10 w-10 grid place-content-center ${
                wallet?.name?.includes("Ledger") ? "bg-purple-700" : ""
              }`}
            >
              {!wallet?.name?.includes("Ledger") ? (
                <img src={wallet?.icon} className="w-full h-full" alt="" />
              ) : (
                <wallet.icon />
              )}
            </div>
            <div>
              <p className="font-bold flex gap-2 text-dashboard-card-heading-text">
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
                    )} USD`}
                  </motion.span>
                </AnimatePresence>

                {wallet?.last_1h_change_percentage ? (
                  <span
                    className={`font-normal ${
                      wallet.last_1h_change_percentage < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {" "}
                    {wallet.last_1h_change_percentage < 0
                      ? wallet.last_1h_change_percentage
                      : `+${wallet.last_1h_change_percentage}`}
                    %
                  </span>
                ) : null}
              </p>

              {!wallet?.name?.includes("Withdrawal") &&
                wallet.coinAmount > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ≈ {wallet.coinAmount} {wallet.name}
                  </p>
                )}

              <p className="text-sm text-dashboard-card-sub-text mt-1">
                {wallet?.name}{" "}
                {!wallet?.name?.includes("Withdrawal") ? "Balance" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full">
        <CryptoCurrencyMarket
          colorTheme={theme}
          width="100%"
        ></CryptoCurrencyMarket>
      </div>
    </>
  );
}

export default UserDashboard;
