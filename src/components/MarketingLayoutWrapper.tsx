"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MainLayoutClient from "./MainLayoutClient";

export default function MarketingLayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Hide marketing header/footer for cabinet routes, but still render children
  if (pathname?.startsWith("/cabinet")) {
    return <>{children}</>;
  }
  
  // For marketing routes, wrap with header and footer
  return (
    <>
      <Header />
      <MainLayoutClient>
        {children}
      </MainLayoutClient>
      <Footer />
    </>
  );
}

