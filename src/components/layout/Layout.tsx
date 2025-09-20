import React from "react";
import { SidebarWithRouter } from "./SidebarWithRouter";
import { Header } from "./Header";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/redux";
import { RightSidebar } from "./RightSidebar";
import { AnimatePresence } from "motion/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);
  const rightSidebarOpen = useAppSelector((state) => state.ui.rightSidebarOpen);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-x-hidden overflow-y-auto">
      <AnimatePresence>{sidebarOpen && <SidebarWithRouter />}</AnimatePresence>
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          !sidebarOpen && "ml-0"
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-7 ">{children}</main>
      </div>
      <AnimatePresence>
        {rightSidebarOpen && <RightSidebar />}
      </AnimatePresence>
    </div>
  );
};
