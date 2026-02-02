"use client";

import { ReactNode } from "react";
import YourArcSidebar from "@/components/dashboard/YourArcSidebar";

export default function YourArcDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0F0E] flex">
      <YourArcSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

