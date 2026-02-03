"use client";

import React from "react";

interface JumpToOverviewLinkProps {
  sectionId: string;
  onJump: (sectionId: string) => void;
  onClose: () => void;
}

export default function JumpToOverviewLink({ sectionId, onJump, onClose }: JumpToOverviewLinkProps) {
  const handleJump = () => {
    // Scroll to section first, then close overlay
    onJump(sectionId);
    // Small delay to allow scroll animation to start
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-white">
      <button
        onClick={handleJump}
        className="text-[12px] leading-[16px] text-gray-600 hover:text-gray-700 font-medium transition-colors"
      >
        Jump to relevant section in Overview
      </button>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-gray-900 text-white rounded-[8px] hover:bg-gray-800 transition-colors text-[13px] leading-[18px] font-medium"
        style={{ height: "36px" }}
      >
        Back to Overview
      </button>
    </div>
  );
}

