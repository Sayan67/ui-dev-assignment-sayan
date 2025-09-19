import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setActiveView } from "@/store/slices/uiSlice";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { PiBookOpenDuotone, PiChartPieSliceDuotone, PiChatsTeardropDuotone, PiIdentificationBadgeDuotone, PiIdentificationCardDuotone, PiNotebookDuotone, PiShoppingBagOpenDuotone, PiUsersThreeDuotone } from "react-icons/pi";
import { RiFolder6Line } from "react-icons/ri";

interface MenuItem {
  id: string;
  label: string;
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
        icon: <PiChartPieSliceDuotone className="w-4 h-4" />,
      },
      {
        id: "ecommerce",
        label: "eCommerce",
        icon: <PiShoppingBagOpenDuotone className="w-4 h-4" />,
        children: [
          { id: "products", label: "Products", icon: <></> },
          { id: "orders", label: "Orders", icon: <></> },
          { id: "customers", label: "Customers", icon: <></> },
        ]
      },
      {
        id: "projects-dash",
        label: "Projects",
        icon: <RiFolder6Line className="w-4 h-4" />,
        children: [
          { id: "active-projects", label: "Active Projects", icon: <></> },
          { id: "archived-projects", label: "Archived Projects", icon: <></> },
          { id: "project-tasks", label: "Project Tasks", icon: <></> },
        ]
      },
      {
        id: "online-courses",
        label: "Online Courses",
        icon: <PiBookOpenDuotone className="w-4 h-4" />,
        children: [
          { id: "my-courses", label: "My Courses", icon: <></> },
          { id: "course-catalog", label: "Course Catalog", icon: <></> },
          { id: "instructors", label: "Instructors", icon: <></> },
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
          { id: "profile-overview", label: "Overview", icon: <></> },
          { id: "profile-projects", label: "Projects", icon: <></> },
          { id: "campaigns", label: "Campaigns", icon: <></> },
          { id: "documents", label: "Documents", icon: <></> },
          { id: "followers", label: "Followers", icon: <></> },
        ],
      },
      {
        id: "account",
        label: "Account",
        icon: <PiIdentificationCardDuotone className="w-4 h-4" />,
        children: [
          { id: "account-overview", label: "Overview", icon: <></> }]
      },
      {
        id: "corporate",
        label: "Corporate",
        icon: <PiUsersThreeDuotone className="w-4 h-4" />,
        children: [
          { id: "corporate-overview", label: "Overview", icon: <></> },
          { id: "corporate-projects", label: "Projects", icon: <></> },
          { id: "corporate-users", label: "Users", icon: <></> },
          { id: "corporate-roles", label: "Roles", icon: <></> },
        ],
      },
      { id: "blog", label: "Blog", icon: <PiNotebookDuotone className="w-4 h-4" /> , children: [
        { id: "blog-overview", label: "Overview", icon: <></> },
        { id: "blog-posts", label: "Posts", icon: <></> }]
      },
      {
        id: "social",
        label: "Social",
        icon: <PiChatsTeardropDuotone className="w-4 h-4" />,
        children: [
          { id: "social-overview", label: "Overview", icon: <></> },
          { id: "social-activities", label: "Activities", icon: <></> },
          { id: "social-messages", label: "Messages", icon: <></> },
          { id: "social-friends", label: "Friends", icon: <></> },
        ],
      },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeView } = useAppSelector((state) => state.ui);
  const [expandedItems, setExpandedItems] = React.useState<string[]>([
    "favorites",
    "dashboards",
  ]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeView === item.label;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (level > 0 && hasChildren) {
              toggleExpanded(item.id);
            } else if(level>0) {
              dispatch(setActiveView(item.label));
            }
          }}
          className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-all",
            !hasChildren && "pl-9",
            !hasChildren && isActive && "bg-foreground/5 relative",
            level > 0 && "cursor-pointer hover:bg-foreground/5",
            level === 0 && "text-foreground/40",
            level > 1 && "pl-14"
          )}
          // style={{ paddingLeft: `${level}px` }}
        >
          {
             !hasChildren && isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[50%] w-1 bg-primary rounded-md"></span>
          }
          {level === 1 &&hasChildren && (
            <span className="text-black/20">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
          {level > 0 && item.icon}
          <span className="flex-1 text-left">{item.label}</span>
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
    key="modal" exit={{ width: 0 }}
    className="max-w-[220px] h-screen bg-background border-r border-border flex flex-col py-5 text-sm">
      <div className=" flex gap-2 items-center mb-8 px-4 pt-2">
        <img src="/logos/main-logo.png" alt="Logo" className="h-6 w-6" />
        <h1 className="text-sm font-normal">ByeWind</h1>
      </div>
      <div className="overflow-y-auto">
        <div className="mb-3 space-y-2 px-4">
          <div className="flex gap-6 items-center">
            <p className="text-black/40 cursor-pointer">Favorites</p>
            <p className="text-black/20 cursor-pointer">Recently</p>
          </div>
          <ul className="space-y-1">
            {["Overview", "Projects"].map((item, ind) => (
              <li key={ind} className="cursor-pointer flex items-center gap-2 hover:bg-foreground/5 px-2 py-1.5 rounded-lg">
                <div className="size-1.5 bg-black/20 rounded-full"></div> {item}
              </li>
            ))}
          </ul>
        </div>
        <nav className="flex-1 gap-4 flex flex-col px-4">
          {menuItems.map((item) => renderMenuItem(item))}
        </nav>
      </div>
    </motion.aside>
  );
};
