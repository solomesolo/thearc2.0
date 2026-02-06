/**
 * Design Tokens for B2C Dashboard
 * 
 * All color values are defined here as constants.
 * Components should reference these tokens, not hard-coded hex values.
 */

export const tokens = {
  light: {
    bg: '#F7F9FC',
    surface: '#FFFFFF',
    surfaceAlt: '#F1F5F9',
    border: '#E2E8F0',
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textTertiary: '#64748B',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    focus: '#93C5FD',
    success: '#16A34A',
    warning: '#F59E0B',
    danger: '#DC2626',
    info: '#0EA5E9',
    neutralBadge: '#CBD5E1',
  },
  dark: {
    bg: '#0B1220',
    surface: '#0F172A',
    surfaceAlt: '#111C33',
    border: '#1F2A44',
    textPrimary: '#E2E8F0',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    primary: '#60A5FA',
    primaryHover: '#3B82F6',
    focus: '#93C5FD',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#0EA5E9',
    neutralBadge: '#475569',
  },
} as const;

export type ThemeMode = 'light' | 'dark';

