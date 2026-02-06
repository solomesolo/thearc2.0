"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FileText, 
  TrendingUp, 
  Calendar,
  Bell, 
  Store,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'command-center', label: 'Command Center', href: '/demo/command-center', icon: <LayoutDashboard size={20} /> },
  { id: 'health-map', label: 'Health Map', href: '/demo/health-map', icon: <FileText size={20} /> },
  { id: 'signals', label: 'Signals', href: '/demo/signals', icon: <TrendingUp size={20} /> },
  { id: 'timeline', label: 'Timeline', href: '/demo/timeline', icon: <Calendar size={20} /> },
  { id: 'documents', label: 'Documents', href: '/demo/documents', icon: <FileText size={20} /> },
  { id: 'reminders', label: 'Reminders', href: '/demo/reminders', icon: <Bell size={20} /> },
  { id: 'marketplace', label: 'Marketplace', href: '/demo/marketplace', icon: <Store size={20} /> },
  { id: 'settings', label: 'Settings', href: '/demo/settings', icon: <Settings size={20} /> },
];

interface LeftNavProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function LeftNav({ isCollapsed, onToggle }: LeftNavProps) {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);

  return (
    <nav
      style={{
        width: isCollapsed ? '72px' : '240px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 0',
        transition: 'width 0.2s ease',
        position: 'relative'
      }}
      aria-label="Main navigation"
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'flex-end',
          padding: '8px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          marginBottom: '8px'
        }}
        aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>

      {navItems.map((item) => {
        const isSelected = pathname === item.href || pathname?.startsWith(item.href);
        return (
          <div key={item.id} style={{ position: 'relative' }}>
            <Link
              href={item.href}
              onMouseEnter={() => isCollapsed && setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 24px',
                background: isSelected ? 'var(--surface-alt)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: isSelected ? 500 : 400,
                transition: 'all 0.2s',
                textDecoration: 'none',
              }}
              aria-label={isCollapsed ? item.label : undefined}
              aria-current={isSelected ? 'page' : undefined}
              title={isCollapsed ? item.label : undefined}
            >
              <span style={{ 
                display: 'flex', 
                alignItems: 'center',
                minWidth: '20px',
                justifyContent: 'center'
              }}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span>{item.label}</span>
              )}
            </Link>
            {isCollapsed && hoveredId === item.id && (
              <div
                style={{
                  position: 'absolute',
                  left: '100%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  marginLeft: '8px',
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--surface)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  zIndex: 1000
                }}
              >
                {item.label}
              </div>
            )}
          </div>
        );
      })}
      
    </nav>
  );
}
