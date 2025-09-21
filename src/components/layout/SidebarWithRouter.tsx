import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { PiBookOpenDuotone, PiChartPieSliceDuotone, PiChatsTeardropDuotone, PiIdentificationBadgeDuotone, PiIdentificationCardDuotone, PiNotebookDuotone, PiShoppingBagOpenDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import { RiFolder6Line } from "react-icons/ri";
import {
  toggleSidebar
} from "@/store/slices/uiSlice";
import { useAppDispatch } from "@/hooks/redux";

interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: "dashboards",
    label: "Dashboards",
    icon: <></>,
    children: [
      {
        id: "default",
        label: "Default",
        path: "/dashboards/default",
        icon: <PiChartPieSliceDuotone className="w-4 h-4" />,
      },
      {
        id: "ecommerce",
        label: "eCommerce",
        path: "/dashboards/ecommerce",
        icon: <PiShoppingBagOpenDuotone className="w-4 h-4" />,
        children: [
          { id: "products", label: "Products", path: "/dashboards/ecommerce/products", icon: <></> },
          { id: "orders", label: "Orders", path: "/dashboards/ecommerce/orders", icon: <></> },
          { id: "customers", label: "Customers", path: "/dashboards/ecommerce/customers", icon: <></> },
        ]
      },
      {
        id: "projects-dash",
        label: "Projects",
        path: "/dashboards/projects",
        icon: <RiFolder6Line className="w-4 h-4" />,
        children: [
          { id: "active-projects", label: "Active Projects", path: "/dashboards/projects/active", icon: <></> },
          { id: "archived-projects", label: "Archived Projects", path: "/dashboards/projects/archived", icon: <></> },
          { id: "project-tasks", label: "Project Tasks", path: "/dashboards/projects/tasks", icon: <></> },
        ]
      },
      {
        id: "online-courses",
        label: "Online Courses",
        path: "/dashboards/online-courses",
        icon: <PiBookOpenDuotone className="w-4 h-4" />,
        children: [
          { id: "my-courses", label: "My Courses", path: "/dashboards/online-courses/my-courses", icon: <></> },
          { id: "course-catalog", label: "Course Catalog", path: "/dashboards/online-courses/catalog", icon: <></> },
          { id: "instructors", label: "Instructors", path: "/dashboards/online-courses/instructors", icon: <></> },
        ]
      },
    ],
  },
  {
    id: "pages",
    label: "Pages",
    icon: <></>,
    children: [
      {
        id: "user-profile",
        label: "User Profile",
        icon: <PiIdentificationBadgeDuotone className="w-4 h-4" />,
        children: [
          { id: "profile-overview", label: "Overview", path: "/pages/user-profile/overview", icon: <></> },
          { id: "profile-projects", label: "Projects", path: "/pages/user-profile/projects", icon: <></> },
          { id: "campaigns", label: "Campaigns", path: "/pages/user-profile/campaigns", icon: <></> },
          { id: "documents", label: "Documents", path: "/pages/user-profile/documents", icon: <></> },
          { id: "followers", label: "Followers", path: "/pages/user-profile/followers", icon: <></> },
        ],
      },
      {
        id: "account",
        label: "Account",
        icon: <PiIdentificationCardDuotone className="w-4 h-4" />,
        children: [
          { id: "account-overview", label: "Overview", path: "/pages/account/overview", icon: <></> }
        ]
      },
      {
        id: "corporate",
        label: "Corporate",
        icon: <PiUsersThreeDuotone className="w-4 h-4" />,
        children: [
          { id: "corporate-overview", label: "Overview", path: "/pages/corporate/overview", icon: <></> },
          { id: "corporate-projects", label: "Projects", path: "/pages/corporate/projects", icon: <></> },
          { id: "corporate-users", label: "Users", path: "/pages/corporate/users", icon: <></> },
          { id: "corporate-roles", label: "Roles", path: "/pages/corporate/roles", icon: <></> },
        ],
      },
      {
        id: "blog",
        label: "Blog",
        icon: <PiNotebookDuotone className="w-4 h-4" />,
        children: [
          { id: "blog-overview", label: "Overview", path: "/pages/blog/overview", icon: <></> },
          { id: "blog-posts", label: "Posts", path: "/pages/blog/posts", icon: <></> }
        ]
      },
      {
        id: "social",
        label: "Social",
        icon: <PiChatsTeardropDuotone className="w-4 h-4" />,
        children: [
          { id: "social-overview", label: "Overview", path: "/pages/social/overview", icon: <></> },
          { id: "social-activities", label: "Activities", path: "/pages/social/activities", icon: <></> },
          { id: "social-messages", label: "Messages", path: "/pages/social/messages", icon: <></> },
          { id: "social-friends", label: "Friends", path: "/pages/social/friends", icon: <></> },
        ],
      },
    ],
  },
];

export const SidebarWithRouter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const dispatch = useAppDispatch();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([
    "dashboards",
    "pages"
  ]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isPathActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = isPathActive(item.path);

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren && level <= 1) {
              toggleExpanded(item.id);
            } else if (item.path) {
              handleNavigation(item.path);
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-all group",
            !hasChildren && "pl-9",
            !hasChildren && isActive && "bg-foreground/5 relative",
            level > 0 && "cursor-pointer hover:bg-foreground/5",
            level === 0 && "text-foreground/40",
            level > 1 && "pl-14"
          )}
        >
          {
            !hasChildren && isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[50%] w-1 bg-primary rounded-md"></span>
          }
          {level === 1 && hasChildren && (
            <span className="text-foreground/20">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          {level > 0 && item.icon}
          <span className="flex-1 text-left group-hover:translate-x-1.5 duration-200">{item.label}</span>
        </button>
        {level > 0 && hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
        {level === 0 && hasChildren && (
          <div className="mt-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.aside
      layout
      animate={{ width: "100%" }} 
      key="modal" 
      exit={{ width: 0 }}
      className="max-w-[220px] h-screen bg-background border-r border-border flex flex-col py-5 text-sm fixed lg:relative left-0 top-0 z-50"
    >
      <X onClick={()=>dispatch(toggleSidebar())} className="bg-foreground/5 rounded-full p-1 border absolute top-6 right-2 md:hidden"/>
      <div className=" flex gap-2 items-center mb-8 px-4 pt-2">
        <img src="/logos/main-logo.png" alt="Logo" className="h-6 w-6" />
        <h1 className="text-sm font-normal">ByeWind</h1>
      </div>
      <div className="overflow-y-auto">
        <div className="mb-3 space-y-2 px-4">
          <div className="flex gap-6 items-center">
            <p className="text-foreground/40 cursor-pointer">Favorites</p>
            <p className="text-foreground/20 cursor-pointer">Recently</p>
          </div>
          <ul className="space-y-1">
            <li 
              onClick={() => navigate('/favorites/overview')}
              className="cursor-pointer flex items-center gap-2 hover:bg-foreground/5 px-2 py-1.5 rounded-lg"
            >
              <div className="size-1.5 bg-foreground/20 rounded-full"></div> Overview
            </li>
            <li 
              onClick={() => navigate('/favorites/projects')}
              className="cursor-pointer flex items-center gap-2 hover:bg-foreground/5 px-2 py-1.5 rounded-lg"
            >
              <div className="size-1.5 bg-foreground/20 rounded-full"></div> Projects
            </li>
          </ul>
        </div>
        <nav className="flex-1 gap-4 flex flex-col px-4">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </div>
    </motion.aside>
  );
};