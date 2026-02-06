"use client";

import React, { useState } from "react";

type TabType = 'Biomarkers' | 'Cardio' | 'Metabolic';

interface TrendsCardProps {
  biomarkers?: any[];
  cardio?: any[];
  metabolic?: any[];
}

export default function TrendsCard({
  biomarkers = [],
  cardio = [],
  metabolic = []
}: TrendsCardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Biomarkers');

  const tabs: TabType[] = ['Biomarkers', 'Cardio', 'Metabolic'];
  
  const getTabData = () => {
    switch (activeTab) {
      case 'Biomarkers':
        return biomarkers;
      case 'Cardio':
        return cardio;
      case 'Metabolic':
        return metabolic;
    }
  };

  const tabData = getTabData();
  const hasEnoughData = tabData && tabData.length > 0;

  const handleKeyDown = (e: React.KeyboardEvent, tab: TabType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveTab(tab);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = tabs.indexOf(activeTab);
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
      setActiveTab(tabs[prevIndex]);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = tabs.indexOf(activeTab);
      const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
      setActiveTab(tabs[nextIndex]);
    }
  };

  return (
    <div
      id="trends"
      style={{
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
    >
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: 600, 
        color: 'var(--text-primary)',
        marginBottom: '20px'
      }}>
        Trends
      </h2>

      {/* Tabs */}
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          borderBottom: '1px solid var(--border)'
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`${tab.toLowerCase()}-panel`}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(e) => handleKeyDown(e, tab)}
            style={{
              padding: '8px 16px',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab ? 500 : 400,
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`${activeTab.toLowerCase()}-panel`}
        aria-labelledby={`${activeTab.toLowerCase()}-tab`}
      >
        {hasEnoughData ? (
          <>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: 500,
              color: 'var(--text-primary)',
              marginBottom: '12px'
            }}>
              Trend over time
            </div>
            {/* Placeholder for chart */}
            <div style={{
              height: '200px',
              backgroundColor: 'var(--surface-alt)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-tertiary)',
              marginBottom: '12px'
            }}>
              Chart visualization would go here
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: 'var(--text-tertiary)'
            }}>
              Tip: Click any metric to view details.
            </div>
          </>
        ) : (
          <div style={{ 
            padding: '32px',
            textAlign: 'center',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ marginBottom: '16px' }}>
              Not enough data to show trends yet.
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
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
                Upload labs
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--surface-alt)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500
                }}
              >
                Connect wearables
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

