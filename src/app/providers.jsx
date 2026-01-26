"use client";

import { ThemeProvider } from "@/context/theme-provider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "@/context/auth/AuthProvider";
import CoinsDataProvider from "@/context/auth/CoinsDataProvider";
import { Toaster } from "@/components/ui/sonner";
import "react-responsive-modal/styles.css";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <CoinsDataProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <AuthProvider>{children}</AuthProvider>
          <Toaster position="top-right" richColors />
        </CoinsDataProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
