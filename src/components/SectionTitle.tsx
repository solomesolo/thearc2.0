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
        className="typography-h2"
        style={textStyle}
      >
        {children}
      </h2>
      {subtitle && (
        <p 
          className="typography-body-secondary"
          style={{
            marginTop: 'var(--space-4)',
            ...textStyle
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

