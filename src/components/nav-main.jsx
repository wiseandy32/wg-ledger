"use client";
/* eslint-disable react/prop-types */
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";

export function NavMain({ items }) {
  const { setOpenMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <SidebarMenu className="pt-12 ">
      {items.map((item) => {
        const isActive =
          item.url === "/user" || item.url === "/admin"
            ? pathname === item.url
            : pathname.startsWith(item.url);

        return (
          <SidebarMenuItem key={item.title} className="mt-3">
            <SidebarMenuButton
              className="pl-12 py-7 text-lg"
              isActive={isActive}
              onClick={() => {
                router.push(item.url);
                setOpenMobile(false);
              }}
            >
              {item.icon && <item.icon />}
              {item.title}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
