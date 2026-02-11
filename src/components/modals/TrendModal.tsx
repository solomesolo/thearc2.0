"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface TrendData {
  name: string;
  latest: number | string;
  unit: string;
  baseline: number | string;
  direction: 'Improving' | 'Worsening' | 'Stable';
}

interface TrendModalProps {
  trend: TrendData | null;
  onClose: () => void;
  onSeeWaysToImprove?: () => void;
}

export default function TrendModal({
  trend,
  onClose,
  onSeeWaysToImprove
}: TrendModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (trend && titleRef.current) {
      titleRef.current.focus();
    }
  }, [trend]);

  useEffect(() => {
    if (!trend) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleTab = (e: KeyboardEvent) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleTab);

    if (modalRef.current) {
      const firstFocusable = modalRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
    };
  }, [trend, onClose]);

  if (!trend) return null;

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'Improving':
        return 'var(--success)';
      case 'Worsening':
        return 'var(--danger)';
      default:
        return 'var(--info)';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trend-modal-title"
    >
      <div
        ref={modalRef}
        style={{
          backgroundColor: 'var(--surface)',
          borderRadius: '8px',
          padding: '24px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <h2
            id="trend-modal-title"
            ref={titleRef}
            tabIndex={-1}
            style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: 'var(--text-primary)'
            }}
          >
            Trend details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Summary Row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'var(--surface-alt)',
          borderRadius: '6px'
        }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Metric
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
              {trend.name}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Latest
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
              {trend.latest} {trend.unit}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Baseline
            </div>
            <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
              {trend.baseline} {trend.unit}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
              Direction
            </div>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: getDirectionColor(trend.direction)
            }}>
              {trend.direction}
            </div>
          </div>
        </div>

        {/* CTA Area */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={onSeeWaysToImprove}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            See ways to improve
          </button>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Close
          </button>
        </div>

        {/* Footer */}
        <div style={{ 
          fontSize: '11px', 
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)'
        }}>
          Trends are based on the data you've uploaded and connected.
        </div>
      </div>
    </div>
  );
}



