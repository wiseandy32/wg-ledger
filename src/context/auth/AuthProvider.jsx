"use client";
import { useState, useEffect, useRef } from "react";
import { AuthContext } from "./use-auth";
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
  const [authInitialized, setAuthInitialized] = useState(false);
  const [userImage, setUserImage] = useState("");
  const userImageUrlRef = useRef(null);

  const { data: user, isLoading: queryIsLoading } = useQuery({
    queryKey: ["uid", uid],
    queryFn: async () => {
      if (!uid || !auth.currentUser) return null;
      const user = await fetchUserByID(uid);
      return user;
    },
    enabled: !!uid && authInitialized && !!auth.currentUser,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("wglid", user.uid);
        setUid(user.uid);
      } else {
        localStorage.removeItem("wglid");
        setUid("");
      }
      setAuthInitialized(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userImageUrlRef.current) {
      URL.revokeObjectURL(userImageUrlRef.current);
      userImageUrlRef.current = null;
    }
    if (user?.profileImageBlob) {
      const url = URL.createObjectURL(user.profileImageBlob);
      userImageUrlRef.current = url;
      setUserImage(url);
    } else {
      setUserImage("");
    }
  }, [user?.profileImageBlob]);

  const isLoading = !authInitialized || queryIsLoading;

  const values = {
    user,
    uid,
    isLoading,
    userImage,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
