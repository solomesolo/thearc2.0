"use client";

import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCommandCenterStore } from "@/state/useCommandCenterStore";
import Toast from "../ui/Toast";

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (reminder: {
    name: string;
    frequency: string;
    startDate: string;
    channels: string[];
  }) => void;
  initialData?: {
    name?: string;
    frequency?: string;
    startDate?: string;
  } | null;
}

export default function ReminderModal({
  isOpen,
  onClose,
  onSave,
  initialData
}: ReminderModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const modalPayload = useCommandCenterStore((state) => state.modal.payload);
  const [name, setName] = useState(modalPayload?.name || initialData?.name || '');
  const [frequency, setFrequency] = useState(modalPayload?.frequency || initialData?.frequency || 'Monthly');
  const [startDate, setStartDate] = useState(modalPayload?.startDate || initialData?.startDate || '');
  const [channels, setChannels] = useState<string[]>(['In-app']);
  const [showToast, setShowToast] = useState(false);
  const { evtReminderSaveSuccess } = useCommandCenterStore();

  // Update form when initialData changes
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setFrequency(initialData.frequency || 'Monthly');
      setStartDate(initialData.startDate || '');
    }
  }, [initialData]);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  const handleChannelToggle = (channel: string) => {
    setChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleSave = () => {
    if (name && startDate) {
      onSave?.({
        name,
        frequency,
        startDate,
        channels
      });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        evtReminderSaveSuccess();
        // Reset form
        setName('');
        setFrequency('Monthly');
        setStartDate('');
        setChannels(['In-app']);
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
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
      aria-labelledby="reminder-modal-title"
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
            id="reminder-modal-title"
            ref={titleRef}
            tabIndex={-1}
            style={{ 
              fontSize: '20px', 
              fontWeight: 600, 
              color: 'var(--text-primary)'
            }}
          >
            Set a reminder
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

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {/* Reminder name */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Reminder name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                backgroundColor: 'var(--surface-alt)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
              placeholder="e.g., Lipid panel reminder"
            />
          </div>

          {/* Frequency */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                backgroundColor: 'var(--surface-alt)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <option value="One time">One time</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Every 6 months">Every 6 months</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          {/* Start date */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Start date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                backgroundColor: 'var(--surface-alt)',
                color: 'var(--text-primary)',
                fontSize: '14px'
              }}
            />
          </div>

          {/* Notification channels */}
          <div>
            <label style={{ 
              display: 'block',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '6px'
            }}>
              Notification channel
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['In-app', 'Email'].map((channel) => (
                <label
                  key={channel}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: 'var(--text-primary)'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={channels.includes(channel)}
                    onChange={() => handleChannelToggle(channel)}
                  />
                  {channel}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleSave}
            disabled={!name || !startDate}
            style={{
              flex: 1,
              padding: '10px 16px',
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: (!name || !startDate) ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              opacity: (!name || !startDate) ? 0.5 : 1
            }}
          >
            Save reminder
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
            Cancel
          </button>
        </div>
      </div>
      </div>

      <Toast message="Reminder saved." show={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}

