// Patient and Visit Types for New Patient Journey

export type Sex = "F" | "M" | "X" | "unknown";
export type IdentityCompleteness = "low" | "medium" | "high";
export type Visit1Status = "not_started" | "draft" | "completed";
export type QueueItemCategory = "results" | "message" | "visit" | "symptoms" | "intake" | "manual";
export type QueueItemStatus = "open" | "in-progress" | "resolved" | "snoozed";
export type UrgencyLevel = "today" | "soon" | "monitor";
export type RiskLevel = "high" | "medium" | "low";

export interface Patient {
  id: string;
  fullName: string;
  dob?: string; // ISO date string
  age?: number; // Age in years (for display)
  sex: Sex;
  phone?: string;
  email?: string;
  identityCompleteness: IdentityCompleteness;
  createdFrom: "new_patient" | "urgent_review" | "search_create";
  createdAtISO: string;
}

export interface Visit {
  id: string;
  patientId: string;
  type: "visit_1";
  status: Visit1Status;
  startedAtISO?: string;
  completedAtISO?: string;
}

export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  age?: number;
  sex: Sex;
  whyNow: string; // max 90 chars displayed
  riskLevel: RiskLevel;
  category: QueueItemCategory;
  urgency: UrgencyLevel;
  suggestedAction: { label: string; actionType: string };
  lastMDContact: { relative: string; exactISO?: string };
  priorityScore: number;
  status: QueueItemStatus;
  linkedVisitId?: string;
  createdAtISO: string;
}

export interface PossibleDuplicate {
  id: string;
  fullName: string;
  dob?: string;
  sex: Sex;
  lastVisit?: string;
  similarityScore: number;
}

export interface AuditEvent {
  id: string;
  eventType:
    | "patient.created"
    | "patient.possible_duplicate_warning_shown"
    | "patient.duplicate_override_reason_selected"
    | "visit1.created"
    | "visit1.draft_started"
    | "queue_item.created"
    | "queue_item.updated";
  timestampISO: string;
  actorId: string; // doctor ID
  entityId: string; // patientId, visitId, queueItemId
  metadata?: Record<string, any>;
}

// Mock storage for patients, visits, queue items
const mockPatients: Patient[] = [];
const mockVisits: Visit[] = [];
const mockQueueItems: QueueItem[] = [];
const mockAuditLog: AuditEvent[] = [];

// Patient creation
export function createPatient(data: {
  fullName: string;
  dob?: string;
  sex: Sex;
  phone?: string;
  email?: string;
  createdFrom: "new_patient" | "urgent_review" | "search_create";
}): Patient {
  const patient: Patient = {
    id: `p_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    fullName: data.fullName,
    dob: data.dob,
    sex: data.sex,
    phone: data.phone,
    email: data.email,
    identityCompleteness: calculateIdentityCompleteness(data),
    createdFrom: data.createdFrom,
    createdAtISO: new Date().toISOString(),
  };

  mockPatients.push(patient);
  logAuditEvent({
    eventType: "patient.created",
    actorId: "doctor_1", // In production, get from auth context
    entityId: patient.id,
    metadata: { createdFrom: data.createdFrom },
  });

  return patient;
}

function calculateIdentityCompleteness(data: {
  fullName: string;
  dob?: string;
  sex: Sex;
  phone?: string;
  email?: string;
}): IdentityCompleteness {
  let score = 0;
  if (data.fullName) score += 2;
  if (data.dob) score += 2;
  if (data.sex && data.sex !== "unknown") score += 1;
  if (data.phone) score += 1;
  if (data.email) score += 1;

  if (score >= 6) return "high";
  if (score >= 4) return "medium";
  return "low";
}

// Visit creation
export function createVisit1(patientId: string): Visit {
  const visit: Visit = {
    id: `v1_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    patientId,
    type: "visit_1",
    status: "draft",
    startedAtISO: new Date().toISOString(),
  };

  mockVisits.push(visit);
  logAuditEvent({
    eventType: "visit1.created",
    actorId: "doctor_1",
    entityId: visit.id,
    metadata: { patientId },
  });

  return visit;
}

// Queue item creation
export function createQueueItem(data: {
  patientId: string;
  patientName: string;
  age?: number;
  sex: Sex;
  whyNow: string;
  category: QueueItemCategory;
  urgency: UrgencyLevel;
  riskLevel?: RiskLevel;
  linkedVisitId?: string;
}): QueueItem {
  const queueItem: QueueItem = {
    id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    patientId: data.patientId,
    patientName: data.patientName,
    age: data.age,
    sex: data.sex,
    whyNow: data.whyNow.length > 90 ? data.whyNow.substring(0, 87) + "..." : data.whyNow,
    riskLevel: data.riskLevel || "medium",
    category: data.category,
    urgency: data.urgency,
    suggestedAction: {
      label: data.category === "visit" ? "Resume Visit 1" : "Review",
      actionType: data.category === "visit" ? "resume_visit1" : "review",
    },
    lastMDContact: { relative: "Never" },
    priorityScore: calculatePriorityScore(data.urgency, data.riskLevel || "medium"),
    status: "open",
    linkedVisitId: data.linkedVisitId,
    createdAtISO: new Date().toISOString(),
  };

  mockQueueItems.push(queueItem);
  logAuditEvent({
    eventType: "queue_item.created",
    actorId: "doctor_1",
    entityId: queueItem.id,
    metadata: { category: data.category, urgency: data.urgency },
  });

  return queueItem;
}

function calculatePriorityScore(urgency: UrgencyLevel, risk: RiskLevel): number {
  const urgencyScores = { today: 100, soon: 50, monitor: 10 };
  const riskScores = { high: 30, medium: 15, low: 5 };
  return urgencyScores[urgency] + riskScores[risk];
}

// Duplicate search
export function searchSimilarPatients(name: string, dob?: string): PossibleDuplicate[] {
  if (!name || name.length < 3) return [];

  const nameLower = name.toLowerCase().trim();
  const results: PossibleDuplicate[] = [];

  for (const patient of mockPatients) {
    const patientNameLower = patient.fullName.toLowerCase();
    let similarityScore = 0;

    // Name similarity (simple Levenshtein-like check)
    if (patientNameLower.includes(nameLower) || nameLower.includes(patientNameLower)) {
      similarityScore += 50;
    }

    // Exact name match
    if (patientNameLower === nameLower) {
      similarityScore += 100;
    }

    // DOB match
    if (dob && patient.dob && dob === patient.dob) {
      similarityScore += 50;
    }

    if (similarityScore >= 50) {
      results.push({
        id: patient.id,
        fullName: patient.fullName,
        dob: patient.dob,
        sex: patient.sex,
        lastVisit: mockVisits.find((v) => v.patientId === patient.id)?.completedAtISO,
        similarityScore,
      });
    }
  }

  return results.sort((a, b) => b.similarityScore - a.similarityScore).slice(0, 5);
}

// Audit logging
export function logAuditEvent(event: Omit<AuditEvent, "id" | "timestampISO">): void {
  const auditEvent: AuditEvent = {
    ...event,
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestampISO: new Date().toISOString(),
  };

  mockAuditLog.push(auditEvent);

  // In production, send to backend
  console.log("[Audit]", auditEvent);

  // Store in localStorage for demo
  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(localStorage.getItem("audit_log") || "[]");
      existing.push(auditEvent);
      localStorage.setItem("audit_log", JSON.stringify(existing.slice(-500))); // Keep last 500
    } catch (e) {
      console.warn("Could not save audit log", e);
    }
  }
}

// Getters for mock data
export function getPatient(patientId: string): Patient | null {
  const stored = typeof window !== "undefined" ? localStorage.getItem(`patient_${patientId}`) : null;
  if (stored) {
    return JSON.parse(stored);
  }
  
  const found = mockPatients.find((p) => p.id === patientId);
  if (found) return found;
  
  // Return dummy patient if not found
  const dummyPatient: Patient = {
    id: patientId,
    fullName: "Sarah Johnson",
    age: 45,
    sex: "F",
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    identityCompleteness: "high",
    createdFrom: "new_patient",
    createdAtISO: new Date().toISOString(),
  };
  
  // Save dummy patient
  if (typeof window !== "undefined") {
    localStorage.setItem(`patient_${patientId}`, JSON.stringify(dummyPatient));
  }
  
  return dummyPatient;
}

export function getVisit1(patientId: string): Visit | null {
  const stored = typeof window !== "undefined" ? localStorage.getItem(`visit1_${patientId}`) : null;
  if (stored) {
    return JSON.parse(stored);
  }
  
  const found = mockVisits.find((v) => v.patientId === patientId && v.type === "visit_1");
  if (found) return found;
  
  // Return dummy visit if not found
  const dummyVisit: Visit = {
    id: `visit1_${patientId}`,
    patientId: patientId,
    type: "visit_1",
    status: "draft",
    startedAtISO: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // Started 15 minutes ago
  };
  
  // Save dummy visit
  if (typeof window !== "undefined") {
    localStorage.setItem(`visit1_${patientId}`, JSON.stringify(dummyVisit));
  }
  
  return dummyVisit;
}

export function getAllQueueItems(): QueueItem[] {
  return [...mockQueueItems];
}

