"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CabinetFooterStatus from "@/components/cabinet/CabinetFooterStatus";
import PatientWorkbenchDrawer from "@/components/workbench/PatientWorkbenchDrawer";
import { QueueItem, generateMockQueueItem } from "@/lib/workbenchTypes";

// Mock queue items data
const mockQueueItems = [
  {
    id: "demo-sarah-johnson",
    patient: { id: "demo-patient-sarah", name: "Sarah Johnson", age: 45, sex: "F" },
    whyHere: "Visit 1 intake in progress — First visit consultation",
    riskLevel: "medium" as const,
    category: "visit" as const,
    urgency: "today" as const,
    status: "open" as const,
    suggestedAction: "Resume Visit 1",
    lastMDContact: "15m ago",
  },
  {
    id: "1",
    patient: { id: "p1", name: "Michael Rodriguez", age: 60, sex: "M" },
    whyHere: "Patient message: 'Chest tightness after exercise, started 3 days ago'",
    riskLevel: "high" as const,
    category: "message" as const,
    urgency: "today" as const,
    status: "open" as const,
    suggestedAction: "Call patient",
    lastMDContact: "Never",
  },
  {
    id: "2",
    patient: { id: "p2", name: "Sarah Chen", age: 54, sex: "F" },
    whyHere: "Elevated hsCRP trending upward over 7 panels, pattern visible only over...",
    riskLevel: "high" as const,
    category: "results" as const,
    urgency: "today" as const,
    status: "open" as const,
    suggestedAction: "Review results",
    lastMDContact: "2d ago",
  },
  {
    id: "3",
    patient: { id: "p3", name: "Jennifer White", age: 50, sex: "F" },
    whyHere: "Lipid panel shows LDL 165 mg/dL, up from 142 mg/dL 6 months ago",
    riskLevel: "medium" as const,
    category: "results" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Review results",
    lastMDContact: "7d ago",
  },
  {
    id: "4",
    patient: { id: "p4", name: "Amanda Brown", age: 35, sex: "F" },
    whyHere: "Thyroid function panel: TSH elevated to 5.8 mIU/L, symptoms of fatigue",
    riskLevel: "medium" as const,
    category: "results" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Review results",
    lastMDContact: "4d ago",
  },
  {
    id: "5",
    patient: { id: "p5", name: "James Park", age: 71, sex: "M" },
    whyHere: "HbA1c increased from 6.2% to 6.8% over 6 months, fasting glucose sta...",
    riskLevel: "medium" as const,
    category: "results" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Review results",
    lastMDContact: "5d ago",
  },
  {
    id: "6",
    patient: { id: "p6", name: "Christopher Taylor", age: 43, sex: "M" },
    whyHere: "Patient message: 'Persistent headaches for 2 weeks, worse in mornings'",
    riskLevel: "medium" as const,
    category: "message" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Call patient",
    lastMDContact: "10d ago",
  },
  {
    id: "7",
    patient: { id: "p7", name: "David Lee", age: 40, sex: "M" },
    whyHere: "Patient message: 'Blood pressure readings at home are consistently 145...'",
    riskLevel: "medium" as const,
    category: "message" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Call patient",
    lastMDContact: "3d ago",
  },
  {
    id: "8",
    patient: { id: "p8", name: "Maria Garcia", age: 63, sex: "F" },
    whyHere: "Colonoscopy follow-up overdue by 2 months, last screening 3 years ago",
    riskLevel: "medium" as const,
    category: "visit" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Schedule visit",
    lastMDContact: "8d ago",
  },
  {
    id: "9",
    patient: { id: "p9", name: "Emily Watson", age: 37, sex: "F" },
    whyHere: "Annual mammogram follow-up due, last screening 13 months ago",
    riskLevel: "medium" as const,
    category: "visit" as const,
    urgency: "soon" as const,
    status: "open" as const,
    suggestedAction: "Schedule visit",
    lastMDContact: "14d ago",
  },
  {
    id: "10",
    patient: { id: "p10", name: "Robert Kim", age: 47, sex: "M" },
    whyHere: "Sleep pattern shift: increased variability over 10 weeks, recovery metrics...",
    riskLevel: "medium" as const,
    category: "symptoms" as const,
    urgency: "monitor" as const,
    status: "open" as const,
    suggestedAction: "Acknowledge & close",
    lastMDContact: "21d ago",
  },
  {
    id: "11",
    patient: { id: "p11", name: "Thomas Anderson", age: 58, sex: "M" },
    whyHere: "Annual physical exam due, last visit 13 months ago",
    riskLevel: "low" as const,
    category: "visit" as const,
    urgency: "monitor" as const,
    status: "open" as const,
    suggestedAction: "Schedule visit",
    lastMDContact: "13d ago",
  },
];

// Helper functions for styling
const getRiskColor = (risk: typeof mockQueueItems[0]['riskLevel']) => {
  switch (risk) {
    case 'high': return 'bg-red-500';
    case 'medium': return 'bg-yellow-500';
    case 'low': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getUrgencyStyles = (urgency: typeof mockQueueItems[0]['urgency']) => {
  switch (urgency) {
    case 'today': return 'bg-red-100 text-red-800';
    case 'soon': return 'bg-orange-100 text-orange-800';
    case 'monitor': return 'bg-gray-100 text-gray-800';
    default: return 'bg-blue-100 text-blue-800';
  }
};

const getActionStyles = (urgency: typeof mockQueueItems[0]['urgency']) => {
  switch (urgency) {
    case 'today': return 'bg-red-50 text-red-700 hover:bg-red-100';
    case 'soon': return 'bg-orange-50 text-orange-700 hover:bg-orange-100';
    case 'monitor': return 'bg-gray-50 text-gray-700 hover:bg-gray-100';
    default: return 'bg-blue-50 text-blue-700 hover:bg-blue-100';
  }
};

const getCategoryIcon = (category: typeof mockQueueItems[0]['category']) => {
  switch (category) {
    case 'message':
      return (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'results':
      return (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'visit':
      return (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    case 'symptoms':
      return (
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    default: return null;
  }
};

export default function PriorityQueuePage() {
  const router = useRouter();
  const [selectedQueueItem, setSelectedQueueItem] = useState<QueueItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [queueItems, setQueueItems] = useState<QueueItem[]>(() => {
    // Initialize with mock data
    return mockQueueItems.map((item) => {
      // Special handling for demo patient - create custom queue item
      if (item.id === "demo-sarah-johnson" || item.patient.id === "demo-patient-sarah") {
        return {
          id: "demo-sarah-johnson",
          patient: { id: "demo-patient-sarah", name: "Sarah Johnson", age: 45, sex: "F" },
          whyHere: "Visit 1 intake in progress — First visit consultation",
          riskLevel: "medium" as const,
          category: "follow-up" as const,
          urgency: "today" as const,
          status: "open" as const,
          suggestedAction: "Resume Visit 1",
          lastMDContact: "15m ago",
          triggerDetails: {
            type: "follow-up",
            visitType: "Visit 1 Intake",
            dueDate: new Date().toISOString().split("T")[0],
            daysLate: 0,
            lastVisitDate: undefined,
            expectedNext: "Complete first visit intake",
          },
          suggestedActions: [
            {
              id: "resume-visit1",
              title: "Resume Visit 1",
              rationale: "Continue documenting patient intake",
              impactLevel: "high",
              effortLevel: "low",
              actionType: "schedule",
            },
          ],
        };
      }
      
      // Map old category names to new ones
      let category: "labs" | "message" | "symptoms" | "follow-up" = "message";
      if (item.category === "results") category = "labs";
      else if (item.category === "visit") category = "follow-up";
      else if (item.category === "message") category = "message";
      else if (item.category === "symptoms") category = "symptoms";
      return generateMockQueueItem(item.id, category);
    });
  });

  // Check if we should use drawer (desktop) or full page (mobile/tablet)
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const handleRowClick = (item: QueueItem) => {
    // Special handling for demo patient - route to Visit 1 intake
    if (item.id === "demo-sarah-johnson" || item.patient.id === "demo-patient-sarah") {
      router.push(`/cabinet/patients/${item.patient.id}/visits/visit-1/intake`);
      return;
    }
    
    // Special handling for visit/intake categories
    if (item.category === "follow-up" && item.suggestedAction?.includes("Visit 1")) {
      router.push(`/cabinet/patients/${item.patient.id}/visits/visit-1/intake`);
      return;
    }
    
    if (isDesktop) {
      setSelectedQueueItem(item);
      setIsDrawerOpen(true);
    } else {
      router.push(`/cabinet/workbench/${item.id}`);
    }
  };

  const handleResolve = (queueItemId: string) => {
    setQueueItems((prev) => prev.filter((item) => item.id !== queueItemId));
    setIsDrawerOpen(false);
    setSelectedQueueItem(null);
  };

  const handleSnooze = (queueItemId: string, until: string, reason: string) => {
    setQueueItems((prev) =>
      prev.map((item) =>
        item.id === queueItemId ? { ...item, status: "snoozed" as const } : item
      )
    );
    setIsDrawerOpen(false);
    setSelectedQueueItem(null);
  };

  const handleEscalate = (queueItemId: string, reason: string) => {
    setQueueItems((prev) =>
      prev.map((item) =>
        item.id === queueItemId
          ? { ...item, urgency: "today" as const }
          : item
      )
    );
    setIsDrawerOpen(false);
    setSelectedQueueItem(null);
  };
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden" style={{ minHeight: 0 }}>
      {/* Fixed Filters Bar - 56px height, no scroll */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white">
        {/* Title and Search Row */}
        <div className="px-6 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Clinical Priority Queue</h1>
            <p className="text-xs text-gray-600 mt-0.5">Patients requiring physician attention</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search patient: name, DOB, ID"
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-600">Total</span>
                <span className="font-semibold text-gray-900">12</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                <span className="text-gray-600">High risk</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-600">Overdue</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-gray-600">Awaiting labs</span>
                <span className="font-semibold text-gray-900">4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Chips Row */}
        <div className="px-6 py-2 border-t border-gray-100 flex items-center gap-2">
          <button className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            High risk only
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Today
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Results
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Messages
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Visits
            <span className="px-1 py-0.5 text-xs bg-gray-200 rounded">17</span>
          </button>
        </div>
      </div>

      {/* Table Container - Flex 1, fills remaining space, contains scroll */}
      <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: 0 }}>
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          <table className="w-full">
            {/* Sticky Table Header */}
            <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  PATIENT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  WHY THIS PATIENT IS HERE
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  RISK LEVEL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  CATEGORY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  URGENCY
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  SUGGESTED ACTION
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                  LAST MD CONTACT
                </th>
              </tr>
            </thead>
            {/* Scrollable Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {queueItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(item)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.patient.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.patient.age} {item.patient.sex}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{item.whyHere}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${getRiskColor(item.riskLevel)}`}></span>
                      <span className="text-sm text-gray-900 capitalize">{item.riskLevel}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(item.category)}
                      <span className="text-sm text-gray-700 capitalize">{item.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getUrgencyStyles(item.urgency)}`}>
                      {item.urgency}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className={`px-3 py-1 text-xs font-medium rounded ${getActionStyles(item.urgency)}`}>
                      {item.suggestedAction}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastMDContact}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fixed Footer - 28px height, no scroll */}
      <CabinetFooterStatus />

      {/* Desktop Drawer */}
      {isDesktop && (
        <PatientWorkbenchDrawer
          isOpen={isDrawerOpen}
          queueItem={selectedQueueItem}
          onClose={() => {
            setIsDrawerOpen(false);
            setSelectedQueueItem(null);
          }}
          onResolve={handleResolve}
          onSnooze={handleSnooze}
          onEscalate={handleEscalate}
        />
      )}
    </div>
  );
}





