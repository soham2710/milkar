"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  FileSpreadsheet, 
  Building, 
  LogOut, 
  Home
} from "lucide-react";

type SidebarProps = {
  onLogout: () => void;
};

export default function AdminSidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Properties", href: "/admin/properties", icon: Building },
    { name: "Reports", href: "/admin/reports", icon: FileSpreadsheet },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 z-10">
      <div className="h-full flex flex-col">
        <nav className="mt-5 px-2 space-y-1 flex-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-orange-500" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
          >
            <Home className="mr-3 h-5 w-5 text-gray-400" />
            Back to Website
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 mt-1 text-sm font-medium text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-500" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}