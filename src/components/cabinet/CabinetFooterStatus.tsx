"use client";

export default function CabinetFooterStatus() {
  // Mock sync time - in production, this would come from state/context
  const lastSyncTime = "14:32";

  return (
    <footer className="h-7 border-t border-gray-200 bg-white flex items-center justify-end px-6 flex-shrink-0">
      <div className="text-xs text-gray-500">
        All changes saved · Last sync {lastSyncTime}
      </div>
    </footer>
  );
}


