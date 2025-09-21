import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  toggleSidebar,
  setSearchQuery,
  toggleRightSidebar,
} from "@/store/slices/uiSlice";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { ModeToggle } from "../theme-toggle";
import {
  PiBellDuotone,
  PiClockCounterClockwiseDuotone,
  PiSidebarDuotone,
  PiStarDuotone,
} from "react-icons/pi";
import { GrCommand } from "react-icons/gr";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.ui);
  const location = useLocation();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Generate breadcrumb from current path
  const getBreadcrumb = () => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    if (pathParts.length === 0) return "Dashboard";

    // Capitalize and format the path parts
    const formatted = pathParts.map((part,ind) => (
      <span className={`${ind === pathParts.length - 1 ? 'text-foreground' : 'text-foreground/40'}`} key={part}>
        {part
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}{} {ind < pathParts.length - 1 && <span className="mx-1">/</span>}
      </span>
    ));

    return formatted;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        const searchInput = document.getElementById("header-search");
        searchInput?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="w-full border-b border-border bg-background flex flex-col md:flex-row  items-center justify-between px-7 py-5">
      <div className="flex items-center gap-4 flex-1">
        <PiSidebarDuotone
          className="h-5 w-5 cursor-pointer"
          onClick={() => dispatch(toggleSidebar())}
        />

        {/* <Button variant="ghost" size="icon"> */}
        <PiStarDuotone className="h-5 w-5 cursor-pointer" />
        {/* </Button> */}

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {getBreadcrumb()}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/20" />
          <Input
            id="header-search"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-[200px] px-9 bg-foreground/5 placeholder:text-foreground/20"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground/20 flex items-center gap-0.5">
            <GrCommand className="h-4 w-3 " />
            {"/"}
          </span>
        </div>

        <ModeToggle />

        <PiClockCounterClockwiseDuotone className="h-5 w-5 cursor-pointer" />

        <PiBellDuotone className="h-5 w-5 cursor-pointer" />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">
                  You have a bug that needs...
                </p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">59 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">
                  You have a bug that needs...
                </p>
                <p className="text-xs text-muted-foreground">12 hours ago</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}

        <PiSidebarDuotone
          onClick={() => dispatch(toggleRightSidebar())}
          className="h-5 w-5 cursor-pointer"
        />
      </div>
    </header>
  );
};
