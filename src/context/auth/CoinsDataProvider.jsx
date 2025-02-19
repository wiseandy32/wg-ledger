import { getCoinsData } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CoinsDataContext } from "./use-coin-data";

function CoinsDataProvider({ children }) {
  const [coins, setCoins] = useState([]);
  const { data: coinsData } = useQuery({
    queryKey: ["coinsData", coins],
    queryFn: async () => {
      const data = await getCoinsData(coins);
      return data;
    },
    refetchInterval: 1000 * 60 * 5,
  });
  // TODO: Add coingecko api key to vercel before pushing
  const values = {
    coins,
    setCoins,
    coinsData,
  };

  return (
    <CoinsDataContext.Provider value={values}>
      {children}
    </CoinsDataContext.Provider>
  );
}

export default CoinsDataProvider;
