import React from "react";
import { motion } from "framer-motion";
import { PiBroadcast, PiBugBeetle, PiUser } from "react-icons/pi";

interface NotificationItem {
  id: string;
  icon: React.ReactNode;
  message: string;
  time: string;
}

interface ActivityItem {
  id: string;
  avatar: string;
  name: string;
  action: string;
  time: string;
}

interface ContactItem {
  id: string;
  name: string;
  avatar: string;
  online?: boolean;
}

const notifications: NotificationItem[] = [
  {
    id: "1",
    icon: <PiBugBeetle className="w-4 h-4" />,
    message: "You have a bug that needs...",
    time: "Just now",
  },
  {
    id: "2",
    icon: <PiUser className="w-4 h-4" />,
    message: "New user registered",
    time: "59 minutes ago",
  },
  {
    id: "3",
    icon: <PiBugBeetle className="w-4 h-4" />,
    message: "You have a bug that needs...",
    time: "12 hours ago",
  },
  {
    id: "4",
    icon: <PiBroadcast className="w-4 h-4" />,
    message: "Andi Lane subscribed to you",
    time: "Today, 11:59 AM",
  },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    avatar: "You",
    name: "You",
    action: "have a bug that needs...",
    time: "Just now",
  },
  {
    id: "2",
    avatar: "Released",
    name: "Released",
    action: "a new version",
    time: "59 minutes ago",
  },
  {
    id: "3",
    avatar: "Submitted",
    name: "Submitted",
    action: "a bug",
    time: "12 hours ago",
  },
  {
    id: "4",
    avatar: "Modified",
    name: "Modified",
    action: "A data in Page X",
    time: "Today, 11:59 AM",
  },
  {
    id: "5",
    avatar: "Deleted",
    name: "Deleted",
    action: "a page in Project X",
    time: "Feb 2, 2023",
  },
];

const contacts: ContactItem[] = [
  { id: "1", name: "Natali Craig", avatar: "Natali Craig" },
  { id: "2", name: "Drew Cano", avatar: "Drew Cano", online: true },
  { id: "3", name: "Orlando Diggs", avatar: "Orlando Diggs" },
  { id: "4", name: "Andi Lane", avatar: "Andi Lane" },
  { id: "5", name: "Kate Morrison", avatar: "Kate Morrison" },
  { id: "6", name: "Koray Okumus", avatar: "Koray Okumus" },
];

export const RightSidebar: React.FC = () => {
  return (
    <motion.aside
      animate={{ width: "100%" }}
      exit={{ width: 0 }}
      layout
      className="max-w-[280px] h-screen bg-background border-l border-border flex flex-col p-5 overflow-y-auto"
    >
      {/* Notifications Section */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification,i) => (
            <div key={notification.id} className="flex items-start gap-3 cursor-pointer">
              <div className={`w-8 h-8 rounded-lg text-[#1c1c1c] flex items-center justify-center flex-shrink-0 ${i%2===0?"bg-primary-blue":"bg-primary-purple"}`}>
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activities Section */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-4">Activities</h2>
        <div className="space-y-4">
          {activities.map((activity,ind) => (
            <div key={activity.id} className="flex items-start gap-3 cursor-pointer">
              <div className="relative">
                <img
                  src={`https://avatar.iran.liara.run/public/boy?username=${activity.avatar}`}
                  alt={activity.name}
                  className="w-8 h-8 rounded-full flex-shrink-0"
                />
                {ind<activities.length-1&&<div className="h-3 w-0.5 bg-primary-light/40 absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[135%]"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  {activity.name} {activity.action}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacts Section */}
      <section>
        <h2 className="text-sm font-semibold mb-4">Contacts</h2>
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <img
                  src={`https://avatar.iran.liara.run/public/boy?username=${contact.avatar}`}
                  alt={contact.name}
                  className="w-8 h-8 rounded-full"
                />
                {/* {contact.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )} */}
              </div>
              <span className="text-sm">{contact.name}</span>
            </div>
          ))}
        </div>
      </section>
    </motion.aside>
  );
};
