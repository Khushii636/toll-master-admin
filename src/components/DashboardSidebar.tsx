import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  DollarSign,
  Car,
  BarChart3,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Fines Management", href: "/dashboard/fines", icon: Receipt },
  { name: "Toll Management", href: "/dashboard/tolls", icon: DollarSign },
  { name: "Vehicle Management", href: "/dashboard/vehicles", icon: Car },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export const DashboardSidebar = () => {
  return (
    <div className="w-64 bg-dashboard-sidebar border-r border-border shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-lg font-bold text-foreground">Traffic Admin</span>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/dashboard"}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};