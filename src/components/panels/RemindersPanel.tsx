"use client";

import React, { useState } from "react";
import { format } from "date-fns";

interface ActiveReminder {
  id: string;
  name: string;
  next: string;
  enabled: boolean;
}

interface SuggestedReminder {
  id: string;
  name: string;
  reason?: string;
}

interface RemindersPanelProps {
  active?: ActiveReminder[];
  suggested?: SuggestedReminder[];
  onToggleReminder?: (id: string, enabled: boolean) => void;
  onAddReminder?: (reminder: SuggestedReminder) => void;
  onManageReminders?: () => void;
  onCreateReminder?: () => void;
}

export default function RemindersPanel({
  active = [],
  suggested = [],
  onToggleReminder,
  onAddReminder,
  onManageReminders,
  onCreateReminder
}: RemindersPanelProps) {
  const [showAllActive, setShowAllActive] = useState(false);
  const [showAllSuggested, setShowAllSuggested] = useState(false);
  
  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch {
      return dateStr;
    }
  };

  const hasAnyReminders = active.length > 0 || suggested.length > 0;

  return (
    <div
      id="reminders"
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
        Reminders & monitoring
      </h3>

      {hasAnyReminders ? (
        <>
          {/* Active Reminders */}
          {active.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px'
              }}>
                Active
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(showAllActive ? active : active.slice(0, 3)).map((reminder) => (
                  <div
                    key={reminder.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '8px 0',
                      borderBottom: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '13px', 
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: '2px'
                      }}>
                        {reminder.name}
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: 'var(--text-secondary)'
                      }}>
                        Next: {formatDate(reminder.next)}
                      </div>
                    </div>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: 'var(--text-secondary)'
                    }}>
                      <input
                        type="checkbox"
                        checked={reminder.enabled}
                        onChange={(e) => onToggleReminder?.(reminder.id, e.target.checked)}
                        style={{ cursor: 'pointer' }}
                        aria-label={`${reminder.name} reminder ${reminder.enabled ? 'on' : 'off'}`}
                      />
                      {reminder.enabled ? 'On' : 'Off'}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suggested Reminders */}
          {suggested.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                fontSize: '12px', 
                fontWeight: 600, 
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '12px'
              }}>
                Suggested
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(showAllSuggested ? suggested : suggested.slice(0, 1)).map((reminder) => (
                  <div
                    key={reminder.id}
                    style={{
                      padding: '10px',
                      backgroundColor: 'var(--surface-alt)',
                      borderRadius: '6px',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ 
                      fontSize: '13px', 
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      marginBottom: '4px'
                    }}>
                      {reminder.name}
                    </div>
                    {reminder.reason && (
                      <div style={{ 
                        fontSize: '11px', 
                        color: 'var(--text-secondary)',
                        marginBottom: '8px'
                      }}>
                        {reminder.reason}
                      </div>
                    )}
                    <button
                      onClick={() => onAddReminder?.(reminder)}
                      style={{
                        padding: '4px 12px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: 500
                      }}
                    >
                      Add
                    </button>
                  </div>
                ))}
                {suggested.length > 1 && !showAllSuggested && (
                  <button
                    onClick={() => setShowAllSuggested(true)}
                    style={{
                      padding: '6px',
                      fontSize: '11px',
                      color: 'var(--text-secondary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    Show {suggested.length - 1} more...
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Footer Button */}
          <button
            onClick={onManageReminders}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 500,
              marginTop: '12px'
            }}
          >
            Manage reminders
          </button>
        </>
      ) : (
        <div style={{ 
          padding: '24px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ marginBottom: '16px' }}>
            No reminders set.
          </div>
          <button
            onClick={onCreateReminder}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Create reminder
          </button>
        </div>
      )}
    </div>
  );
}

