"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface FooterProps {
  accentColor?: string;
}

export default function Footer({ accentColor = '#6ED3C2' }: FooterProps) {
  const pathname = usePathname();
  const isOverlay = ["/contact", "/privacy-policy", "/terms"].includes(pathname);

  return (
    <footer 
      className={`arc-footer ${isOverlay ? 'hidden md:block' : 'block'} mt-auto flex-shrink-0`}
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="arc-footer-container">
        {/* Footer Links */}
        <div className="arc-footer-nav">
          <Link 
            href="/" 
            className="arc-footer-nav-link"
          >
            Platform
          </Link>
          <Link 
            href="/personas" 
            className="arc-footer-nav-link"
          >
            Programs
          </Link>
          <Link 
            href="/catalog/countries" 
            className="arc-footer-nav-link"
          >
            Marketplace
          </Link>
          <Link 
            href="/clinics" 
            className="arc-footer-nav-link"
          >
            Clinics
          </Link>
          <Link 
            href="/privacy-policy" 
            className="arc-footer-nav-link"
          >
            Privacy Policy
          </Link>
          <Link 
            href="/terms" 
            className="arc-footer-nav-link"
          >
            Terms and Conditions
          </Link>
        </div>

        {/* Positioning Sentence */}
        <div className="arc-footer-tagline">
          <p className="arc-footer-tagline-text">
            The Arc. Health intelligence for long term care.
          </p>
        </div>
      </div>
    </footer>
  );
}
