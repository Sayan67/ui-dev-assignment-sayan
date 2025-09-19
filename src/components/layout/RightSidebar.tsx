import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setActiveView } from '@/store/slices/uiSlice';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  FolderOpen,
  BookOpen,
  User,
  Users,
  FileText,
  UserCheck,
  Settings,
  Building,
  BookMarked,
  MessageSquare,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'favorites',
    label: 'Favorites',
    icon: <></>,
    children: [
      { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'projects', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
    ],
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    icon: <></>,
    children: [
      { id: 'default', label: 'Default', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'ecommerce', label: 'eCommerce', icon: <ShoppingCart className="w-4 h-4" /> },
      { id: 'projects-dash', label: 'Projects', icon: <FolderOpen className="w-4 h-4" /> },
      { id: 'online-courses', label: 'Online Courses', icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    id: 'pages',
    label: 'Pages',
    icon: <></>,
    children: [
      {
        id: 'user-profile',
        label: 'User Profile',
        icon: <User className="w-4 h-4" />,
        children: [
          { id: 'profile-overview', label: 'Overview', icon: <></> },
          { id: 'profile-projects', label: 'Projects', icon: <></> },
          { id: 'campaigns', label: 'Campaigns', icon: <></> },
          { id: 'documents', label: 'Documents', icon: <></> },
          { id: 'followers', label: 'Followers', icon: <></> },
        ],
      },
      { id: 'account', label: 'Account', icon: <Settings className="w-4 h-4" /> },
      { id: 'corporate', label: 'Corporate', icon: <Building className="w-4 h-4" /> },
      { id: 'blog', label: 'Blog', icon: <BookMarked className="w-4 h-4" /> },
      { id: 'social', label: 'Social', icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
];

export const RightSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, activeView } = useAppSelector((state) => state.ui);
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['favorites', 'dashboards']);

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
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              dispatch(setActiveView(item.label));
            }
          }}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-all',
            'hover:bg-accent/50',
            isActive && !hasChildren && 'bg-accent text-accent-foreground',
            level === 0 && 'font-medium text-muted-foreground',
            level > 0 && 'text-foreground'
          )}
          style={{ paddingLeft: `${level * 12 + 12}px` }}
        >
          {level > 0 && item.icon}
          <span className="flex-1 text-left">{item.label}</span>
          {hasChildren && (
            <span className="ml-auto">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <motion.aside 
    animate={{ width: "100%" }}
    exit={{ width: 0 }}
    layout
    className="max-w-[280px] h-screen bg-background border-l border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">ByeWind</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">
        {menuItems.map((item) => renderMenuItem(item))}
      </nav>
    </motion.aside>
  );
};