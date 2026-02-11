"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAS } from "@/lib/persona";
import EmailSignupModal from "./EmailSignupModal";
import ThemeToggle from "./theme/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Use persona config to ensure consistency
  const personaLinks = [
    { label: PERSONAS.women.name, href: PERSONAS.women.route },
    { label: PERSONAS.traveler.name, href: PERSONAS.traveler.route },
    { label: PERSONAS.rebuilder.name, href: PERSONAS.rebuilder.route },
  ];

  return (
    <header className={`premium-nav-header ${isScrolled ? "premium-nav-scrolled" : ""}`}>
      <div className="premium-nav-container">
        {/* Logo */}
        <Link href="/" className="premium-nav-logo">
          <span>TheArc</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="premium-nav-desktop">
          {/* Platform */}
          <Link 
            href="/" 
            className={`premium-nav-item ${isActive("/") && pathname === "/" ? "premium-nav-item-active" : ""}`}
          >
            Platform
          </Link>

          {/* Programs Dropdown */}
          <div className="premium-nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              className={`premium-nav-item premium-nav-dropdown-trigger ${isActive("/personas") || personaLinks.some(link => isActive(link.href)) ? "premium-nav-item-active" : ""}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
            >
              Programs
              <svg
                className={`premium-nav-chevron ${isDropdownOpen ? "premium-nav-chevron-open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="premium-nav-dropdown"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {personaLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="premium-nav-dropdown-item"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Your Arc */}
          <Link 
            href="/your-arc" 
            className={`premium-nav-item ${isActive("/your-arc") ? "premium-nav-item-active" : ""}`}
          >
            Your Arc
          </Link>

          {/* Marketplace */}
          <Link 
            href="/catalog/countries" 
            className={`premium-nav-item ${isActive("/marketplace") || isActive("/catalog") ? "premium-nav-item-active" : ""}`}
          >
            Marketplace
          </Link>

          {/* Clinics */}
          <Link 
            href="/clinics" 
            className={`premium-nav-item ${isActive("/clinics") ? "premium-nav-item-active" : ""}`}
          >
            Clinics
          </Link>
        </nav>

        {/* Primary CTAs: Get Started (Individuals) + For Clinics and Doctors */}
        <div className="premium-nav-ctas" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <ThemeToggle variant="icon" showLabel={false} />
          <Link 
            href="/clinics"
            className="premium-nav-cta-secondary"
          >
            For Clinics
          </Link>
          <button 
            onClick={() => setShowEmailModal(true)}
            className="premium-nav-cta-primary"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="premium-nav-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`premium-nav-hamburger ${isMobileMenuOpen ? "premium-nav-hamburger-open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="premium-nav-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="premium-nav-mobile-content">
              <Link
                href="/"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Platform
              </Link>
              <MobileDropdown
                title="Programs"
                items={personaLinks}
                onClose={() => setIsMobileMenuOpen(false)}
              />
              <Link
                href="/your-arc"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Your Arc
              </Link>
              <Link
                href="/catalog/countries"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                href="/clinics"
                className="premium-nav-mobile-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Clinics
              </Link>
              
              {/* Mobile CTAs */}
              <div className="premium-nav-mobile-ctas">
                <Link
                  href="/clinics"
                  className="premium-nav-mobile-cta-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  For Clinics
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowEmailModal(true);
                  }}
                  className="premium-nav-mobile-cta-primary"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <EmailSignupModal isOpen={showEmailModal} onClose={() => setShowEmailModal(false)} />
    </header>
  );
}

// Mobile Dropdown Component
function MobileDropdown({
  title,
  items,
  onClose,
}: {
  title: string;
  items: Array<{ label: string; href: string; external?: boolean }>;
  onClose: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="premium-nav-mobile-dropdown">
      <button
        className="premium-nav-mobile-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          className={`premium-nav-mobile-chevron ${isOpen ? "premium-nav-mobile-chevron-open" : ""}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="premium-nav-mobile-dropdown-content">
          {items.map((item) => (
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-nav-mobile-dropdown-item"
                onClick={onClose}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="premium-nav-mobile-dropdown-item"
                onClick={onClose}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      )}
    </div>
  );
}
