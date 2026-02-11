"use client";

import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ children, subtitle, className = "" }: SectionTitleProps) {
  const isCentered = className.includes('text-center');
  const containerStyle = isCentered ? { 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    textAlign: 'center' as const,
    width: '100%'
  } : {};
  const textStyle = isCentered ? { textAlign: 'center' as const } : {};
  
  return (
    <div className={className} style={containerStyle}>
      <h2 
        className="font-bold mb-0"
        style={{
          fontSize: 'clamp(32px, 4vw, 42px)',
          lineHeight: '1.2',
          color: 'var(--text)',
          ...textStyle
        }}
      >
        {children}
      </h2>
      {subtitle && (
        <p 
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            marginTop: '12px',
            color: 'var(--text-muted)',
            ...textStyle
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

