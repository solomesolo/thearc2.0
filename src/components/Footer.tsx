"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  accentColor?: string;
}

export default function Footer({ accentColor = '#4DE4C1' }: FooterProps) {
  const pathname = usePathname();
  const isOverlay = ["/contact", "/privacy-policy", "/terms"].includes(pathname);

  return (
    <footer 
      className={`w-full px-6 md:px-10 py-12 md:py-16 ${isOverlay ? 'hidden md:block' : 'block'} mt-auto flex-shrink-0`}
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
          <Link 
            href="/" 
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Platform
          </Link>
          <Link 
            href="/personas" 
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Programs
          </Link>
          <Link 
            href="/catalog/countries" 
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Marketplace
          </Link>
          <Link 
            href="/clinics" 
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Clinics
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
          >
            Terms and Conditions
          </Link>
        </div>

        {/* Positioning Sentence */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            The Arc. Health intelligence for long term care.
          </p>
        </div>
      </div>
    </footer>
  );
}
