// Workbench Types and Data Models

export type RiskLevel = 'high' | 'medium' | 'low';
export type UrgencyLevel = 'today' | 'soon' | 'monitor';
export type TriggerCategory = 'labs' | 'message' | 'symptoms' | 'follow-up';
export type ImpactLevel = 'high' | 'medium' | 'low';
export type EffortLevel = 'low' | 'medium' | 'high';
export type ActionType = 'call' | 'message' | 'schedule' | 'task' | 'delegate';

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
}

export interface QueueItem {
  id: string;
  patient: Patient;
  whyHere: string;
  riskLevel: RiskLevel;
  category: TriggerCategory;
  urgency: UrgencyLevel;
  status: 'open' | 'in-progress' | 'resolved' | 'snoozed';
  suggestedAction: string;
  lastMDContact: string | null;
  triggerDetails: TriggerDetails;
  suggestedActions?: SuggestedAction[];
}

export interface LabValue {
  testName: string;
  value: number;
  units: string;
  direction: '↑' | '↓' | '→';
  referenceRange: string;
  delta?: string; // e.g., "+14 vs last"
  trend?: string; // e.g., "Upward trend over 3 results"
}

export interface LabsTrigger {
  type: 'labs';
  abnormalValues: LabValue[];
  whyThisMatters: string;
}

export interface MessageTrigger {
  type: 'message';
  messageText: string;
  timestamp: string;
  channel: string; // e.g., "Portal message"
  extractedSymptoms?: string[];
}

export interface SymptomsTrigger {
  type: 'symptoms';
  symptomSummary: string;
  onset: string;
  redFlags?: string[];
}

export interface FollowUpTrigger {
  type: 'follow-up';
  visitType: string;
  dueDate: string;
  daysLate?: number;
  lastVisitDate?: string;
  expectedNext?: string;
}

export type TriggerDetails = LabsTrigger | MessageTrigger | SymptomsTrigger | FollowUpTrigger;

export interface SuggestedAction {
  id: string;
  title: string;
  rationale: string;
  impactLevel: ImpactLevel;
  effortLevel: EffortLevel;
  actionType: ActionType;
}

export interface RelevantContext {
  familyHistory?: string;
  currentPlan?: string[];
  recentRelatedLabs?: Array<{ test: string; value: string; date: string }>;
  activeMedications?: string[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  queueItemId: string;
  patientId: string;
  action: string;
  actionType: string;
  metadata?: Record<string, any>;
}

export function logAuditEvent(event: Omit<AuditEvent, 'id' | 'timestamp'>): void {
  const auditEvent: AuditEvent = {
    ...event,
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
  };
  
  // In production, this would send to backend
  console.log('[Audit]', auditEvent);
  
  // Store in localStorage for demo (only on client side)
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const existing = JSON.parse(localStorage.getItem('workbench_audit_log') || '[]');
      existing.push(auditEvent);
      localStorage.setItem('workbench_audit_log', JSON.stringify(existing.slice(-100))); // Keep last 100
    } catch (e) {
      // Silently fail if localStorage is not available
      console.warn('Could not save audit log to localStorage', e);
    }
  }
}

// Mock data generators
export function generateMockQueueItem(id: string, category: TriggerCategory): QueueItem {
  const basePatient: Patient = {
    id: `p${id}`,
    name: id === '1' ? 'Michael Rodriguez' : id === '2' ? 'Sarah Chen' : 'Jennifer White',
    age: id === '1' ? 60 : id === '2' ? 54 : 50,
    sex: id === '1' ? 'M' : 'F',
  };

  let triggerDetails: TriggerDetails;
  let whyHere: string;
  let suggestedActions: SuggestedAction[] = [];

  switch (category) {
    case 'labs':
      triggerDetails = {
        type: 'labs',
        abnormalValues: [
          {
            testName: 'ApoB',
            value: 112,
            units: 'mg/dL',
            direction: '↑',
            referenceRange: '< 90',
            delta: '+14 vs last',
            trend: 'Upward trend over 3 results',
          },
        ],
        whyThisMatters: 'High relative to patient\'s genetic risk and family history of MI.',
      };
      whyHere = 'New ApoB elevation in patient with strong family history of MI.';
      suggestedActions = [
        {
          id: 'sa1',
          title: 'Schedule Visit 2',
          rationale: 'Due to ApoB increase + family history',
          impactLevel: 'high',
          effortLevel: 'low',
          actionType: 'schedule',
        },
        {
          id: 'sa2',
          title: 'Order Lipid Panel Follow-up',
          rationale: 'Confirm trend and assess full lipid profile',
          impactLevel: 'medium',
          effortLevel: 'low',
          actionType: 'task',
        },
      ];
      break;

    case 'message':
      triggerDetails = {
        type: 'message',
        messageText: 'I\'ve been experiencing chest tightness after exercise, started about 3 days ago. It goes away when I rest but comes back when I walk up stairs.',
        timestamp: '2h ago',
        channel: 'Portal message',
        extractedSymptoms: ['chest tightness', 'exercise-induced', 'relieved by rest'],
      };
      whyHere = 'Patient reports chest tightness after exercise, started 3 days ago.';
      suggestedActions = [
        {
          id: 'sa3',
          title: 'Call Patient',
          rationale: 'Urgent: chest symptoms require immediate assessment',
          impactLevel: 'high',
          effortLevel: 'low',
          actionType: 'call',
        },
        {
          id: 'sa4',
          title: 'Schedule Urgent Visit',
          rationale: 'Rule out cardiac causes',
          impactLevel: 'high',
          effortLevel: 'medium',
          actionType: 'schedule',
        },
      ];
      break;

    case 'follow-up':
      triggerDetails = {
        type: 'follow-up',
        visitType: 'Colonoscopy follow-up',
        dueDate: '2025-01-15',
        daysLate: 18,
        lastVisitDate: '2022-01-10',
        expectedNext: 'Colonoscopy screening per guidelines (3-year interval)',
      };
      whyHere = 'Colonoscopy follow-up overdue by 18 days, last screening 3 years ago.';
      suggestedActions = [
        {
          id: 'sa5',
          title: 'Schedule Colonoscopy',
          rationale: 'Overdue preventive screening',
          impactLevel: 'medium',
          effortLevel: 'low',
          actionType: 'schedule',
        },
      ];
      break;

    default:
      triggerDetails = {
        type: 'symptoms',
        symptomSummary: 'Sleep pattern shift: increased variability',
        onset: '10 weeks ago',
      };
      whyHere = 'Sleep pattern shift: increased variability over 10 weeks.';
  }

  return {
    id,
    patient: basePatient,
    whyHere,
    riskLevel: category === 'message' ? 'high' : category === 'labs' ? 'high' : 'medium',
    category,
    urgency: category === 'message' ? 'today' : category === 'labs' ? 'today' : 'soon',
    status: 'open',
    suggestedAction: category === 'message' ? 'Call patient' : category === 'labs' ? 'Review results' : 'Schedule visit',
    lastMDContact: id === '1' ? 'Never' : id === '2' ? '2d ago' : '7d ago',
    triggerDetails,
    suggestedActions,
  };
}

