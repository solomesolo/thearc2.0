"use client";

import React, { useState } from "react";

interface Action {
  title: string;
  reason: string;
  urgency: 'High' | 'Medium' | 'Low';
}

interface NextBestActionsPanelProps {
  actions?: Action[];
  onSetReminder?: (action: Action) => void;
  onViewOptions?: (action: Action) => void;
  contextSelection?: { type: string; id: string } | null;
}

export default function NextBestActionsPanel({
  actions = [],
  onSetReminder,
  onViewOptions,
  contextSelection
}: NextBestActionsPanelProps) {
  const [showAll, setShowAll] = useState(false);
  
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High':
        return 'var(--danger)';
      case 'Medium':
        return 'var(--warning)';
      default:
        return 'var(--info)';
    }
  };

  return (
    <div
      id="recommendations"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <h3 style={{ 
        fontSize: '16px', 
        fontWeight: 600, 
        color: 'var(--text-primary)',
        marginBottom: '16px'
      }}>
        Recommended next steps
      </h3>

      {actions.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={showAll && actions.length > 3 ? { maxHeight: '420px', overflowY: 'auto' } : {}}>
            {(showAll ? actions : actions.slice(0, 3)).map((action, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--surface-alt)',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  marginBottom: idx < (showAll ? actions.length - 1 : Math.min(actions.length, 3) - 1) ? '12px' : '0'
                }}
              >
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  marginBottom: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  {action.title}
                  {contextSelection?.type === 'action' && contextSelection.id === action.title && (
                    <span style={{ 
                      fontSize: '11px', 
                      color: 'var(--text-tertiary)',
                      fontStyle: 'italic'
                    }}>
                      Sent to Marketplace
                    </span>
                  )}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-secondary)',
                  marginBottom: '8px'
                }}>
                  {action.reason}
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: getUrgencyColor(action.urgency),
                    backgroundColor: `${getUrgencyColor(action.urgency)}20`,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>▲</span> {action.urgency}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => onSetReminder?.(action)}
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                  >
                    Set reminder
                  </button>
                  <button
                    onClick={() => onViewOptions?.(action)}
                    style={{
                      flex: 1,
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                  >
                    View options
                  </button>
                </div>
              </div>
            ))}
          </div>
          {actions.length > 3 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              style={{
                padding: '8px',
                backgroundColor: 'transparent',
                color: 'var(--primary)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              Show all ({actions.length})
            </button>
          )}
        </div>
      ) : (
        <div style={{ 
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ marginBottom: '4px' }}>
            You're up to date.
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            Complete more data to unlock deeper recommendations.
          </div>
        </div>
      )}
    </div>
  );
}

