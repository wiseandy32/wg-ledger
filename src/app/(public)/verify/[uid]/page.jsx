import VerifyPage from "@/views/VerifyAccount";
import { Suspense } from "react";

export default async function Page({ params }) {
  const { uid } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage uid={uid} />
    </Suspense>
  );
}
