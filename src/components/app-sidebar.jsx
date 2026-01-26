"use client";
import { GrUploadOption } from "react-icons/gr";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LayoutGrid } from "lucide-react";
import { Download } from "lucide-react";
import { usePathname } from "next/navigation";
import { User2 } from "lucide-react";
import { ArrowRightLeft } from "lucide-react";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user",
      icon: LayoutGrid,
    },
    {
      title: "Deposit",
      url: "/user/deposit",
      icon: Download,
    },
    {
      title: "Withdraw",
      url: "/user/withdraw",
      icon: GrUploadOption,
    },
    {
      title: "Convert",
      url: "/user/convert",
      icon: ArrowRightLeft,
    },
    {
      title: "Transactions",
      url: "/user/transactions",
      icon: ArrowRightLeft,
    },
  ],
  admin: [
    {
      title: "Users",
      url: "/admin",
      icon: User2,
    },
    {
      title: "Deposits",
      url: "/admin/deposits",
      icon: Download,
    },
    {
      title: "Withdrawals",
      url: "/admin/withdrawals",
      icon: GrUploadOption,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img
          src="/logo.png"
          alt="World Global Ledger"
          className="dark:brightness-0 dark:invert w-40 ml-2 pt-2"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={pathname.includes("admin") ? data.admin : data.navMain}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
