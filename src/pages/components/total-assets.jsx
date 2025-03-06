"use client";

import { Eye, EyeOff, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatNumberWithCommas, getCurrentBitcoinPrice } from "@/lib/helpers";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function TotalAssets({ balance, bitcoin_price }) {
  const [isVisible, setIsVisible] = useState(true);
  const { data: currentBitcoinPrice } = useQuery({
    queryKey: ["currentBitcoinPrice"],
    queryFn: async () => {
      const data = await getCurrentBitcoinPrice();
      return data;
    },
    refetchInterval: 1000 * 60 * 5,
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const formatHiddenNumber = (length) => "*".repeat(length);

  return (
    <div className="bg-black text-white p-4 mt-8 bg-muted/50 rounded-lg">
      <div className="flex max-sm:flex-col max-sm:gap-4 md:items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-gray-400 text-sm">Total Assets</h2>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              {isVisible ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl text-black dark:text-white font-medium tabular-nums">
              {isVisible
                ? `$${formatNumberWithCommas(balance)}`
                : formatHiddenNumber(8)}
            </span>
            {isVisible ? (
              <span className="text-gray-400 text-lg">USD</span>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 tabular-nums">
            <span>
              ≈{" "}
              {isVisible
                ? `${balance / currentBitcoinPrice} BTC`
                : formatHiddenNumber(10)}
            </span>
            {/* <Info className="w-4 h-4" /> */}
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to={"deposit"}
            className="bg-[#FFA800] hover:bg-[#FF9500] max-sm:w-full text-center text-black font-semibold px-8 py-2 rounded-lg"
          >
            Deposit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TotalAssets;
