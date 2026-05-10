import TransactionHistoryPage from "@/views/Transactions";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TransactionHistoryPage />
    </Suspense>
  );
}

export const metadata = {
  title: "Transactions | Quantum Global System",
  description: "Web ledger application",
};
