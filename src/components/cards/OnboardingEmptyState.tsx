"use client";

import React from "react";

interface OnboardingEmptyStateProps {
  onConnectProviders?: () => void;
  onUploadDocuments?: () => void;
}

export default function OnboardingEmptyState({
  onConnectProviders,
  onUploadDocuments
}: OnboardingEmptyStateProps) {
  return (
    <div style={{
      padding: '64px 32px',
      textAlign: 'center',
      backgroundColor: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '16px'
      }}>
        Get your medical history in one place
      </h2>

      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 32px 0',
        textAlign: 'left',
        display: 'inline-block'
      }}>
        <li style={{
          marginBottom: '12px',
          fontSize: '16px',
          color: 'var(--text-secondary)',
          paddingLeft: '24px',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}>•</span>
          Upload lab results, imaging, and reports
        </li>
        <li style={{
          marginBottom: '12px',
          fontSize: '16px',
          color: 'var(--text-secondary)',
          paddingLeft: '24px',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}>•</span>
          Connect providers to import existing records
        </li>
        <li style={{
          marginBottom: '12px',
          fontSize: '16px',
          color: 'var(--text-secondary)',
          paddingLeft: '24px',
          position: 'relative'
        }}>
          <span style={{
            position: 'absolute',
            left: 0,
            top: 0
          }}>•</span>
          See what's missing and what to do next
        </li>
      </ul>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
        <button
          onClick={onConnectProviders}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500
          }}
        >
          Connect providers
        </button>
        <button
          onClick={onUploadDocuments}
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500
          }}
        >
          Upload documents
        </button>
      </div>

      <div style={{
        fontSize: '12px',
        color: 'var(--text-tertiary)',
        paddingTop: '24px',
        borderTop: '1px solid var(--border)'
      }}>
        Your data stays private and is used to personalize your recommendations.
      </div>
    </div>
  );
}


