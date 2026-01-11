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
    <div className="glass-card p-6 mt-8 rounded-xl relative overflow-hidden group">
      <div className="relative z-10 flex max-sm:flex-col max-sm:gap-6 md:items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h2 className="text-gray-400 text-sm font-medium tracking-wide uppercase">
              Total Assets
            </h2>
            <button
              onClick={toggleVisibility}
              className="text-gray-500 hover:text-brand-primary transition-colors duration-300"
            >
              {isVisible ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl md:text-5xl text-white font-bold tracking-tight tabular-nums premium-gradient-text">
              {isVisible
                ? `$${formatNumberWithCommas(balance)}`
                : formatHiddenNumber(8)}
            </span>
            {isVisible ? (
              <span className="text-gray-500 text-lg font-medium">USD</span>
            ) : null}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400/80 font-medium tabular-nums">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
              <span className="text-brand-primary">≈</span>
              {isVisible
                ? `${(balance / currentBitcoinPrice).toFixed(8)} BTC`
                : formatHiddenNumber(10)}
            </div>
            {/* <Info className="w-4 h-4" /> */}
          </div>
        </div>

        <div className="flex justify-center">
          <Link
            to={"deposit"}
            className="glass-button bg-brand-primary/10 border-brand-primary/20 hover:bg-brand-primary/20 hover:border-brand-primary/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] text-brand-primary font-semibold px-8 py-3 rounded-xl w-full sm:w-auto text-center"
          >
            Deposit Funds
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TotalAssets;
