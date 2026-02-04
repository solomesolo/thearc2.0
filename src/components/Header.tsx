"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Platform", href: "/" },
    { label: "Your Arc", href: "/your-arc" },
    { label: "Marketplace", href: "/catalog/countries" },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full transition-all bg-[var(--color-bg-page)]/80 backdrop-blur-md"
        style={{ height: "76px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Left: Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center h-full"
              aria-label="TheArc Home"
            >
              <span className="text-xl font-bold text-white whitespace-nowrap tracking-tight">
                TheArc
              </span>
            </Link>

            {/* Center: Desktop Navigation - Minimal, airy, luxury styling */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-normal whitespace-nowrap transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] group nav-link ${
                      active
                        ? "text-[var(--text-1)]"
                        : "text-[var(--text-1)] hover:text-[var(--text-0)]"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-sm px-1 -mx-1`}
                  >
                    <span className="relative z-10">{link.label}</span>
                    
                    {/* Active state indicator - very subtle dot */}
                    {active && (
                      <span
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-[var(--color-accent-primary)]/40"
                        aria-hidden="true"
                      />
                    )}
                    
                    {/* Hover underline - extremely subtle */}
                    {!active && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent-primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-ui)]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTAs */}
            <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
              <Link
                href="/clinics"
                className={`relative nav-link whitespace-nowrap transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] group ${
                  isActive("/clinics")
                    ? "text-[var(--text-1)]"
                    : "text-[var(--text-1)] hover:text-[var(--text-0)]"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-sm px-1 -mx-1`}
              >
                <span className="relative z-10">Clinics</span>
                
                {/* Active state indicator - very subtle dot */}
                {isActive("/clinics") && (
                  <span
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 rounded-full bg-[var(--color-accent-primary)]/40"
                    aria-hidden="true"
                  />
                )}
                
                {/* Hover underline - extremely subtle */}
                {!isActive("/clinics") && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent-primary)] opacity-0 group-hover:opacity-5 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-ui)]"
                    aria-hidden="true"
                  />
                )}
              </Link>
              <Button variant="primary" size="sm" href="/your-arc">
                Get Started
              </Button>
            </div>

            {/* Mobile: Hamburger Menu Button */}
            <button
              className="lg:hidden flex-shrink-0 w-10 h-10 flex items-center justify-center text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)] rounded-md"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" strokeWidth={2} />
              ) : (
                <Menu className="w-6 h-6" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.24, ease: [0.25, 0.8, 0.5, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[var(--color-bg-card-elevated)] shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-6">
                  <span className="nav-link font-semibold text-white">Navigation</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-9 h-9 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card-elevated)] rounded-lg"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </button>
                </div>

                {/* Main Navigation Links */}
                <nav className="flex-1 px-6 py-6">
                  <div className="space-y-1">
                    {navLinks.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`relative flex items-center px-4 py-3.5 rounded-lg text-[15px] font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card-elevated)] ${
                            active
                              ? "bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-primary)]"
                              : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-text-primary)]"
                          }`}
                        >
                          {active && (
                            <span
                              className="absolute left-3 w-1 h-1 rounded-full bg-[var(--color-accent-primary)]"
                              aria-hidden="true"
                            />
                          )}
                          <span className={active ? "ml-5" : ""}>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                {/* For Clinics Section */}
                <div className="px-6 py-6">
                  <p className="text-xs font-semibold text-[var(--color-text-muted)] tracking-[0.02em] mb-3 px-1">
                    For clinics
                  </p>
                  <Link
                    href="/clinics"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative flex items-center px-4 py-3.5 rounded-lg text-[15px] font-medium transition-all duration-[var(--duration-fast)] ease-[var(--ease-ui)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-card-elevated)] ${
                      isActive("/clinics")
                        ? "bg-[var(--color-accent-bg-subtle)] text-[var(--color-accent-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-white/5 hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {isActive("/clinics") && (
                      <span
                        className="absolute left-3 w-1 h-1 rounded-full bg-[var(--color-accent-primary)]"
                        aria-hidden="true"
                      />
                    )}
                    <span className={isActive("/clinics") ? "ml-5" : ""}>Clinics</span>
                  </Link>
                </div>

                {/* Drawer Footer with CTA */}
                <div className="px-6 py-6">
                  <Button
                    variant="primary"
                    size="md"
                    href="/your-arc"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
