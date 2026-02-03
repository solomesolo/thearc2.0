"use client";

import { useParams } from "next/navigation";
import FirstVisitIntakeWorkspace from "@/components/intake/FirstVisitIntakeWorkspace";

export default function Visit1IntakePage() {
  const params = useParams();
  const patientId = params.patientId as string;

  return <FirstVisitIntakeWorkspace patientId={patientId} />;
}

