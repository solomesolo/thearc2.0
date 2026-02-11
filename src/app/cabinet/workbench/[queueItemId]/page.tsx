"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PatientWorkbench from "@/components/workbench/PatientWorkbench";
import { QueueItem, generateMockQueueItem } from "@/lib/workbenchTypes";

export default function PatientWorkbenchPage() {
  const params = useParams();
  const router = useRouter();
  const queueItemId = params.queueItemId as string;
  const [queueItem, setQueueItem] = useState<QueueItem | null>(null);

  useEffect(() => {
    // In production, fetch from API
    // For now, generate mock data based on ID
    const category = queueItemId === "1" ? "message" : queueItemId === "2" ? "labs" : "follow-up";
    const item = generateMockQueueItem(queueItemId, category);
    setQueueItem(item);
  }, [queueItemId]);

  const handleClose = () => {
    router.push("/cabinet/priority-queue");
  };

  const handleResolve = (id: string) => {
    // In production, update queue state
    router.push("/cabinet/priority-queue");
  };

  const handleSnooze = (id: string, until: string, reason: string) => {
    // In production, update queue state
    router.push("/cabinet/priority-queue");
  };

  const handleEscalate = (id: string, reason: string) => {
    // In production, update queue state
    router.push("/cabinet/priority-queue");
  };

  if (!queueItem) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <PatientWorkbench
        queueItem={queueItem}
        onClose={handleClose}
        onResolve={handleResolve}
        onSnooze={handleSnooze}
        onEscalate={handleEscalate}
        mode="page"
      />
    </div>
  );
}




