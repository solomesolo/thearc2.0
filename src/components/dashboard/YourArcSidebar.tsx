"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ArrowRight,
  Lightbulb,
  FileText,
  FlaskConical,
  ShoppingBag,
  MessageSquare,
  Settings,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "overview", label: "Overview", href: "/dashboard/your-arc", icon: <LayoutDashboard size={18} /> },
  { id: "timeline", label: "Timeline", href: "/dashboard/your-arc/timeline", icon: <Calendar size={18} /> },
  { id: "next-actions", label: "Next actions", href: "/dashboard/your-arc/next-actions", icon: <ArrowRight size={18} /> },
  { id: "insights", label: "Insights", href: "/dashboard/your-arc/insights", icon: <Lightbulb size={18} /> },
  { id: "records", label: "Records", href: "/dashboard/your-arc/records", icon: <FileText size={18} /> },
  { id: "blueprints", label: "Blueprints", href: "/dashboard/your-arc/blueprints", icon: <FlaskConical size={18} /> },
  { id: "marketplace", label: "Marketplace", href: "/dashboard/your-arc/marketplace", icon: <ShoppingBag size={18} /> },
  { id: "messages", label: "Messages", href: "/dashboard/your-arc/messages", icon: <MessageSquare size={18} /> },
  { id: "settings", label: "Settings", href: "/dashboard/your-arc/settings", icon: <Settings size={18} /> },
];

export default function YourArcSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 border-r border-white/5 bg-[#0a0a0a] min-h-screen">
      <div className="p-6 border-b border-white/5">
        <Link href="/dashboard/your-arc" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4DEECD] to-[#4DEECD]/60 flex items-center justify-center">
            <span className="text-black font-bold text-sm">A</span>
          </div>
          <span className="text-white font-semibold text-lg">Your Arc</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = 
            pathname === item.href || 
            (item.href === "/dashboard/your-arc" && pathname === "/dashboard/your-arc" && 
             !pathname.includes("/timeline") && 
             !pathname.includes("/next-actions") && 
             !pathname.includes("/insights") && 
             !pathname.includes("/records") && 
             !pathname.includes("/blueprints") && 
             !pathname.includes("/marketplace") && 
             !pathname.includes("/messages") && 
             !pathname.includes("/settings"));
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? "bg-[#4DEECD]/10 text-[#4DEECD] border border-[#4DEECD]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className={isActive ? "text-[#4DEECD]" : "text-gray-500"}>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <Link
          href="/your-arc"
          className="text-xs text-gray-400 hover:text-white transition-colors"
        >
          ← Back to Your Arc
        </Link>
      </div>
    </aside>
  );
}

