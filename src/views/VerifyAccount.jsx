"use client";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { updateFirebaseDb } from "@/lib/helpers";

export default function VerifyPage() {
  const { uid } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token || !uid) {
      setStatus("Invalid verification link.");
      return;
    }

    const verifyAccount = async () => {
      try {
        await updateFirebaseDb("users", uid, {
          isAccountVerified: true,
          verificationToken: token,
        });
        setStatus("Account successfully verified!");
        setTimeout(() => router.push("/login"), 3000);
      } catch (error) {
        console.error(error);
        setStatus("Unable to verify your account.");
      }
    };

    verifyAccount();
  }, [uid, searchParams, router]);

  return (
    <div style={{ padding: 20, marginTop: "150px", textAlign: "center" }}>
      <h1>{status}</h1>
      <p>
        {status.includes("Unable") && "Contact support for further assistance."}
        {status.includes("successfully") && "Redirecting to login page..."}
      </p>
    </div>
  );
}
