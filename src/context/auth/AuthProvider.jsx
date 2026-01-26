"use client";
/* eslint-disable react/prop-types */
import { useState } from "react";
import { AuthContext } from "./use-auth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useQuery } from "@tanstack/react-query";
import { fetchUserByID } from "@/lib/helpers";

function AuthProvider({ children }) {
  const [uid, setUid] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("wglid") || "";
    }
    return "";
  });
  const { data: user, isLoading } = useQuery({
    queryKey: ["uid", uid],
    queryFn: async () => {
      if (!uid) return null;
      const user = await fetchUserByID(uid);
      return user;
    },
    enabled: !!uid,
  });

  const values = {
    user,
    uid,
    isLoading,
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("wglid", user?.uid);
        setUid(user?.uid);
      }
    });
  }, []);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
