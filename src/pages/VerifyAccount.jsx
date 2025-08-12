import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateFirebaseDb } from "@/lib/helpers";

export default function VerifyPage() {
  const { uid } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token || !uid) {
      setStatus("Invalid verification link.");
      return;
    }
    console.log("Verifying account for UID:", uid, "with token:", token);
    const verifyAccount = async () => {
      try {
        // const userRef = doc(db, "users", uid);
        await updateFirebaseDb("users", uid, {
          isAccountVerified: true,
          verificationToken: token,
        });
        setStatus("Account successfully verified!");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        console.error(error);
        setStatus("Unable to verify your account.");
      }
    };

    verifyAccount();
  }, [uid, searchParams, navigate]);

  return (
    <div style={{ padding: 20, marginTop: "150px", textAlign: "center" }}>
      <h1>{status}</h1>
      <p>
        {status.includes("Unable") && "Contact support for further assistance."}
        {!status.includes("Unable") && "Redirecting to login page..."}
      </p>
    </div>
  );
}
