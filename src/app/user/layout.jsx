"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/views/Dashboard";
import { AuthContext } from "@/context/auth/use-auth";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLoader from "@/views/components/PageLoader";
import { AnimatePresence } from "framer-motion";

export default function UserLayout({ children }) {
  const { user, uid, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!uid) {
        router.push(
          `/login?from=${encodeURIComponent(window.location.pathname)}`,
        );
      } else if (user?.isAdmin) {
        router.push("/admin");
      } else {
        setChecking(false);
      }
    }
  }, [uid, user, isLoading, router]);

  if (isLoading || checking) {
    return (
      <AnimatePresence>
        <PageLoader key="loader" subtext="Authenticating..." />
      </AnimatePresence>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <Dashboard>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </Dashboard>
    </SidebarProvider>
  );
}
