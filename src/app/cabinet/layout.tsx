"use client";

import { ReactNode, useEffect } from "react";

export default function DoctorCabinetLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Change body background for cabinet routes immediately
    const body = document.body;
    const html = document.documentElement;
    
    // Force white background with inline styles (highest priority)
    body.style.setProperty('background-color', 'white', 'important');
    body.style.setProperty('color', '#111827', 'important');
    html.style.setProperty('background-color', 'white', 'important');
    
    // Remove black background classes
    body.classList.remove("bg-black", "text-white");
    body.classList.add("bg-white", "text-gray-900");
    
    // Also add a style element to the head for persistence
    const style = document.createElement('style');
    style.id = 'cabinet-body-override';
    style.textContent = `
      body {
        background-color: white !important;
        color: #111827 !important;
      }
      html {
        background-color: white !important;
      }
      body.bg-black {
        background-color: white !important;
        color: #111827 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Restore on unmount
      body.style.removeProperty('background-color');
      body.style.removeProperty('color');
      html.style.removeProperty('background-color');
      body.classList.add("bg-black", "text-white");
      body.classList.remove("bg-white", "text-gray-900");
      const styleEl = document.getElementById('cabinet-body-override');
      if (styleEl) styleEl.remove();
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 flex flex-col bg-white text-gray-900" style={{ zIndex: 1000, backgroundColor: 'white' }}>
      {/* Fixed Top Bar - 56px height */}
      <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-gray-900">TheArc Clinical Workspace</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-gray-900">New patient</button>
          <button className="text-sm text-gray-600 hover:text-gray-900">Urgent review</button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Side Navigation - 64px/240px */}
        <aside className="w-16 border-r border-gray-200 bg-white flex flex-col items-center py-4">
          <nav className="flex flex-col gap-2 w-full">
            <a href="/cabinet/priority-queue" className="p-2 flex items-center justify-center hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </a>
            <a href="/cabinet/patients" className="p-2 flex items-center justify-center hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </a>
            <a href="/cabinet/schedule" className="p-2 flex items-center justify-center hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>
            <a href="/cabinet/tasks" className="p-2 flex items-center justify-center hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </a>
            <a href="/cabinet/settings" className="p-2 flex items-center justify-center hover:bg-gray-100 rounded">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </a>
          </nav>
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}

