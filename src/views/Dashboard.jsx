"use client";
/* eslint-disable react/prop-types */
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter, usePathname } from "next/navigation";
import ModeToggle from "@/components/theme-toggle";

function Dashboard({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  // const { theme } = useTheme();
  const paths = pathname.split("/").filter((item) => item !== "");

  return (
    <>
      <SidebarInset>
        <header className="sticky top-0 z-50 mb-2 w-[97.5%] justify-between flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-solid border-b-2 border-slate-200 dark:border-slate-600/50 bg-background/80 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb className="hidden sm:block">
              <BreadcrumbList>
                {paths.map((path, index) => {
                  return (
                    <>
                      <BreadcrumbItem
                        className="capitalize text-xs md:text-base"
                        key={path}
                      >
                        {index + 1 > paths.length - 1 ? (
                          <BreadcrumbPage>
                            {!paths[1] ? "Dashboard" : path}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            className="cursor-pointer"
                            onClick={() => {
                              // logic for breadcrumb navigation might need adjustment
                              // but for now replacing navigate with router.push
                              const targetPath =
                                "/" + paths.slice(0, index + 1).join("/");
                              router.push(targetPath);
                            }}
                          >
                            {!paths[1] ? "Dashboard" : path}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index + 1 > paths.length - 1 ? null : (
                        <BreadcrumbSeparator />
                      )}
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="justify-self-end flex gap-3">
            {/* <ConnectKitButton mode={theme} /> */}
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:w-[98.5%]">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          {children}
        </div>
      </SidebarInset>
    </> // </section>
  );
}

export default Dashboard;
