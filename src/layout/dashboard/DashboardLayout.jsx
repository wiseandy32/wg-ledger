import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "@/pages/Dashboard";
import { Outlet, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Suspense, useState, useEffect } from "react";
import { Await } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import { Navigate } from "react-router-dom";
import PageLoader from "@/pages/components/PageLoader";
import { AnimatePresence } from "framer-motion";

function DashboardLayout() {
  const data = useLoaderData();
  const location = useLocation();
  const [isPageLoading, setIsPageLoading] = useState(false);

  emailjs.init({ publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY });

  useEffect(() => {
    // Show loader on path change
    setIsPageLoading(true);

    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2500); // 2.5s to match PageLoader animation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <AnimatePresence mode="wait">
        {isPageLoading && <PageLoader key="page-loader" />}
      </AnimatePresence>
      <AppSidebar />
      <Dashboard>
        <Suspense fallback={<DashboardSkeleton />}>
          <Await
            resolve={data.user}
            errorElement={<p>Something wrong happened!</p>}
          >
            {(user) => {
              if (user?.isAdmin) {
                return <Navigate to={"/admin"} />;
              } else {
                return <Outlet />;
              }
            }}
          </Await>
        </Suspense>
      </Dashboard>
    </SidebarProvider>
  );
}

export default DashboardLayout;
