export const metadata = {
  title: "Clinical Priority Queue | TheArc",
  description: "Clinical priority queue for physicians",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Mock queue items data - matching the actual dashboard
const mockQueueItems = [
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

export default function PriorityQueuePage() {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Functionality Panel */}
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Clinical Priority Queue</h1>
            <p className="text-sm text-gray-600 mt-1">Patients requiring physician attention</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search patient: name, DOB, ID"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 max-w-md"
          />
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Total items</span>
              <span className="font-semibold text-gray-900">12</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-gray-600">High risk</span>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Overdue</span>
              <span className="font-semibold text-gray-900">2</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Awaiting labs</span>
              <span className="font-semibold text-gray-900">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Priority Filters */}
      <div className="border-b border-gray-200 bg-white px-6 py-3">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            High risk only
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Today
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Results
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Messages
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Visits
            <span className="px-1.5 py-0.5 text-xs bg-gray-200 rounded">17</span>
          </button>
        </div>
      </div>

      {/* Clinical Priority Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PATIENT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                WHY THIS PATIENT IS HERE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                RISK LEVEL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CATEGORY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URGENCY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SUGGESTED ACTION
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                LAST MD CONTACT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockQueueItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 cursor-pointer">
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
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.riskLevel === "high"
                          ? "bg-red-500"
                          : item.riskLevel === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                    <span className="text-sm text-gray-900 capitalize">{item.riskLevel}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {item.category === "message" && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                    {item.category === "results" && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {item.category === "visit" && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                    {item.category === "symptoms" && (
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    <span className="text-sm text-gray-700 capitalize">{item.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      item.urgency === "today"
                        ? "bg-red-100 text-red-800"
                        : item.urgency === "soon"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={`px-3 py-1 text-xs font-medium rounded ${
                      item.urgency === "today"
                        ? "bg-red-50 text-red-700 hover:bg-red-100"
                        : item.urgency === "soon"
                        ? "bg-orange-50 text-orange-700 hover:bg-orange-100"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
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
  );
}





