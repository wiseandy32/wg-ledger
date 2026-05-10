import Login from "@/views/Login";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}

export const metadata = {
  title: "Login | Quantum Global System",
  description: "Web ledger application",
};
