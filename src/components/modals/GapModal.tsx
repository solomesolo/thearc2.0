"use client";

import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface Gap {
  id?: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  evidence_level?: 'High' | 'Moderate' | 'Emerging';
}

interface GapModalProps {
  gap: Gap | null;
  onClose: () => void;
  onUpload?: () => void;
  onSetReminder?: () => void;
  onViewServices?: () => void;
}

export default function GapModal({
  gap,
  onClose,
  onUpload,
  onSetReminder,
  onViewServices
}: GapModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (gap && titleRef.current) {
      titleRef.current.focus();
    }
  }, [gap]);

  useEffect(() => {
    if (!gap) return;

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

    // Trap focus within modal
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
  }, [gap, onClose]);

  if (!gap) return null;

  const getEvidenceColor = (level?: string) => {
    switch (level) {
      case 'High':
        return 'var(--success)';
      case 'Moderate':
        return 'var(--warning)';
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
      aria-labelledby="gap-modal-title"
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
            id="gap-modal-title"
            ref={titleRef}
            tabIndex={-1}
            style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: 'var(--text-primary)'
            }}
          >
            Document needed
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

        {/* Missing or outdated */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            fontSize: '14px', 
            color: 'var(--text-secondary)',
            marginBottom: '8px'
          }}>
            Missing or outdated: <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{gap.title}</span>
          </div>
        </div>

        {/* Why it matters */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            Why it matters
          </h3>
          <div style={{ 
            fontSize: '13px', 
            color: 'var(--text-secondary)',
            marginBottom: '8px'
          }}>
            Evidence level:{' '}
            <span style={{ 
              color: getEvidenceColor(gap.evidence_level),
              fontWeight: 500
            }}>
              {gap.evidence_level || 'Emerging'}
            </span>
          </div>
        </div>

        {/* What you can do */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            marginBottom: '12px'
          }}>
            What you can do
          </h3>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <li style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '20px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Upload an existing document
            </li>
            <li style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '20px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Order a relevant test
            </li>
            <li style={{ fontSize: '13px', color: 'var(--text-secondary)', paddingLeft: '20px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0 }}>•</span>
              Set a reminder
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={onUpload}
            style={{
              width: '100%',
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
            Upload document
          </button>
          <button
            onClick={onSetReminder}
            style={{
              width: '100%',
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
            Set reminder
          </button>
          <button
            onClick={onViewServices}
            style={{
              width: '100%',
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
            View service options
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
          Arc does not provide medical diagnosis. This is informational.
        </div>
      </div>
    </div>
  );
}

