"use client";

import React from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface Metric {
  name: string;
  value: string | number;
  unit: string;
  delta?: number;
  deltaType?: 'up' | 'down' | 'stable';
}

interface HealthSnapshotCardProps {
  status?: 'Stable' | 'Improving' | 'Needs attention';
  riskLevel?: 'Low' | 'Moderate' | 'High';
  metrics?: Metric[];
  onViewTrend?: (metric: Metric) => void;
}

export default function HealthSnapshotCard({
  status = 'Stable',
  riskLevel = 'Low',
  metrics = [],
  onViewTrend
}: HealthSnapshotCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Improving':
        return 'var(--success)';
      case 'Needs attention':
        return 'var(--warning)';
      default:
        return 'var(--info)';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High':
        return 'var(--danger)';
      case 'Moderate':
        return 'var(--warning)';
      default:
        return 'var(--success)';
    }
  };

  const formatDelta = (delta: number, type: string) => {
    const absDelta = Math.abs(delta);
    if (type === 'up') {
      return <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ArrowUp size={14} /> {absDelta}
      </span>;
    } else if (type === 'down') {
      return <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ArrowDown size={14} /> {absDelta}
      </span>;
    } else {
      return <span style={{ color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Minus size={14} /> 0
      </span>;
    }
  };

  return (
    <div
      id="overview"
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
        Health Snapshot
      </h2>

      {/* Status Row */}
      <div style={{ 
        display: 'flex', 
        gap: '32px', 
        marginBottom: '24px',
        flexWrap: 'wrap'
      }}>
        <div>
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--text-secondary)',
            marginBottom: '4px'
          }}>
            Health status
          </div>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 500,
            color: getStatusColor(status)
          }}>
            {status}
          </div>
        </div>
        <div>
          <div style={{ 
            fontSize: '12px', 
            color: 'var(--text-secondary)',
            marginBottom: '4px'
          }}>
            Risk level
          </div>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 500,
            color: getRiskColor(riskLevel),
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>▲</span> {riskLevel}
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      {metrics.length > 0 ? (
        <>
          <div style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: 'var(--text-primary)',
            marginBottom: '16px'
          }}>
            Key metrics
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {metrics.map((metric, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: idx < metrics.length - 1 ? '1px solid var(--border)' : 'none'
              }}>
                <div>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    marginBottom: '4px'
                  }}>
                    {metric.name}
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    color: 'var(--text-secondary)'
                  }}>
                    {metric.value} {metric.unit}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {metric.delta !== undefined && metric.deltaType && (
                    formatDelta(metric.delta, metric.deltaType)
                  )}
                  <button
                    onClick={() => onViewTrend?.(metric)}
                    style={{
                      fontSize: '12px',
                      color: 'var(--primary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    View trend
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ 
          padding: '32px',
          textAlign: 'center',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ marginBottom: '16px' }}>
            Add labs or wearable data to see your key metrics here.
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
              Connect providers
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
              Upload documents
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

