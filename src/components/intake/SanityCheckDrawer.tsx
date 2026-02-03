"use client";

import React, { useState } from "react";
import { Visit1IntakeData } from "@/lib/intakeTypes";
import { TabStatus } from "@/lib/visit1ProgressEngine";

interface SanityCheckDrawerProps {
  tabId: string;
  tabLabel: string;
  tabStatus: TabStatus;
  tabHint?: string | null; // Optional hint from progress engine
  intakeData: Visit1IntakeData;
  onUpdateIntakeData: (updates: Partial<Visit1IntakeData>) => void;
  onClose: () => void;
  onJumpToOverview: (sectionId: string) => void;
}

export default function SanityCheckDrawer({
  tabId,
  tabLabel,
  tabStatus,
  tabHint: propTabHint,
  intakeData,
  onUpdateIntakeData,
  onClose,
  onJumpToOverview,
}: SanityCheckDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, any>>({});
  const [undoStack, setUndoStack] = useState<Array<{ blockId: string; previousData: Partial<Visit1IntakeData> }>>([]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getStatusIndicator = () => {
    switch (tabStatus) {
      case "reviewed":
        return <span className="text-[12px]" style={{ color: "#10B981" }}>🟢</span>;
      case "partial":
        return <span className="text-[12px]" style={{ color: "#F59E0B" }}>🟡</span>;
      case "not_reviewed":
        return <span className="text-[12px]" style={{ color: "#9CA3AF" }}>⬜</span>;
    }
  };

  const generateSummary = (): string => {
    const narrative = intakeData.patientStory.narrative || "";
    
    switch (tabId) {
      case "cardiovascular": {
        const hasFamilyMI = /(father|mother|parent|family).*(mi|myocardial infarction|heart attack)/i.test(narrative);
        const hasFamilyStroke = /(father|mother|parent|family).*(stroke)/i.test(narrative);
        const hasHypertension = /(hypertension|high blood pressure|bp|blood pressure)/i.test(narrative);
        const hasSymptoms = /(chest pain|dyspnea|shortness of breath|angina)/i.test(narrative);
        
        let summary = "Patient reports ";
        if (hasFamilyMI) summary += "family history of myocardial infarction. ";
        if (hasSymptoms) summary += "Cardiovascular symptoms mentioned. ";
        if (!hasHypertension) summary += "No prior hypertension diagnosis documented.";
        else summary += "Hypertension history noted.";
        
        return summary;
      }
      
      case "metabolic": {
        const hasDiabetes = /(diabetes|diabetic|blood sugar|glucose)/i.test(narrative);
        const hasDiet = /(diet|eating|meal|nutrition|food|eating window|meals)/i.test(narrative);
        const hasExercise = /(exercise|workout|activity|regular exercise)/i.test(narrative);
        
        if (!hasDiabetes && !hasDiet && !hasExercise) {
          return "No metabolic risk factors identified yet. Diet and exercise patterns not fully documented.";
        }
        
        let summary = "";
        if (!hasDiabetes) summary += "No metabolic risk factors identified yet. ";
        if (hasDiet) summary += "Diet appears structured. ";
        if (hasExercise) summary += "Regular exercise reported.";
        if (!hasExercise && hasDiet) summary += "Exercise patterns not fully documented.";
        
        return summary || "Metabolic factors under review.";
      }
      
      case "cancer": {
        const hasFamilyCRC = /(father|mother|parent|family).*(colon|colorectal|crc|cancer)/i.test(narrative);
        const hasPersonalCancer = /(personal.*cancer|had cancer|diagnosed.*cancer)/i.test(narrative);
        const hasScreening = /(colonoscopy|mammogram|screening|pap|psa)/i.test(narrative);
        
        let summary = "";
        if (hasFamilyCRC) summary += "Family history of colorectal cancer reported. ";
        if (!hasPersonalCancer) summary += "No personal cancer history. ";
        if (!hasScreening) summary += "Screening status not fully documented.";
        else summary += "Screening history noted.";
        
        return summary || "Cancer risk factors under review.";
      }
      
      case "neuro": {
        const hasCognitive = /(brain fog|memory|cognition|cognitive|forgetful)/i.test(narrative);
        const hasStress = /(stress|anxiety|mood|depression|mental health)/i.test(narrative);
        const stressLevel = /(high stress|moderate stress|low stress)/i.test(narrative) 
          ? (/(high stress)/i.test(narrative) ? "high" : /(moderate stress)/i.test(narrative) ? "moderate" : "low")
          : null;
        
        let summary = "";
        if (!hasCognitive) summary += "No cognitive or neurologic symptoms reported. ";
        if (hasStress) {
          summary += `Stress load ${stressLevel || "moderate"}.`;
        } else {
          summary += "Stress level not documented.";
        }
        
        return summary || "Neuro/cognitive factors under review.";
      }
      
      case "sleep": {
        const sleepDuration = narrative.match(/(\d+)\s*(hour|hr|h)/i)?.[1] || null;
        const hasSnoring = /(snoring|snore)/i.test(narrative);
        const hasFatigue = /(fatigue|tired|exhausted)/i.test(narrative);
        
        let summary = "";
        if (sleepDuration) summary += `Sleep duration ~${sleepDuration} hours. `;
        else summary += "Sleep duration not documented. ";
        if (hasSnoring && hasFatigue) summary += "Snoring and fatigue reported.";
        else if (hasSnoring) summary += "Snoring reported.";
        else if (hasFatigue) summary += "Fatigue reported.";
        else summary += "No sleep red flags documented.";
        
        return summary;
      }
      
      case "fitness": {
        const hasStrength = /(strength|weight.*training|resistance|lifting)/i.test(narrative);
        const hasCardio = /(cardio|running|cycling|swimming|aerobic|zone 2)/i.test(narrative);
        const hasWalking = /(walking|steps)/i.test(narrative);
        const walkingDuration = narrative.match(/(\d+)\s*(min|minute)/i)?.[1] || null;
        
        let summary = "";
        if (hasStrength) summary += "Regular strength training reported. ";
        if (!hasCardio) summary += "Cardio frequency unclear.";
        else summary += "Cardio activity noted.";
        if (hasWalking && walkingDuration) summary += ` Walking: ${walkingDuration} min.`;
        
        return summary || "Fitness patterns under review.";
      }
      
      case "plan": {
        const selectedLabs = intakeData.suggestedDiagnostics.filter(d => d.selected);
        const hasFollowUp = intakeData.openQuestions?.includes("Visit 2") || intakeData.openQuestions?.includes("follow-up");
        
        let summary = "Visit 1 Next Steps (Draft): ";
        summary += `Labs ${selectedLabs.length > 0 ? `${selectedLabs.length} selected` : "pending selection"}. `;
        summary += "Imaging none selected. ";
        summary += hasFollowUp ? "Follow-up discussed." : "Follow-up not scheduled.";
        
        return summary;
      }
      
      case "timeline": {
        return "Visit timeline and key events will appear here.";
      }
      
      case "documents": {
        const docCount = intakeData.documents?.count || 0;
        return docCount > 0 
          ? `${docCount} document${docCount > 1 ? "s" : ""} uploaded. Review status pending.`
          : "No documents uploaded yet.";
      }
      
      default:
        return "Summary not available for this section.";
    }
  };

  const getSectionId = (): string => {
    const sectionMap: Record<string, string> = {
      cardiovascular: "cardiovascular",
      metabolic: "metabolic",
      cancer: "cancer-screening",
      neuro: "neuro",
      sleep: "sleep",
      fitness: "fitness",
    };
    return sectionMap[tabId] || "overview";
  };

  const summary = generateSummary();
  const sectionId = getSectionId();
  
  // Use hint from prop if provided, otherwise compute from intakeData
  const tabHint = propTabHint || null;

  const generateConfirmationBlocks = () => {
    const narrative = intakeData.patientStory.narrative || "";
    const blocks: Array<{
      label: string;
      value: string;
      status: "captured" | "missing" | "partial";
      editAction?: () => void;
    }> = [];

    switch (tabId) {
      case "cardiovascular": {
        const hasFamily = /(father|mother|parent|family).*(heart|cardiac|mi|myocardial|stroke|cardiovascular)/i.test(narrative);
        const hasBP = /(blood pressure|bp|hypertension|hypotension)/i.test(narrative);
        const hasSymptoms = /(chest pain|dyspnea|shortness of breath|angina|exertional)/i.test(narrative);
        
        blocks.push(
          {
            label: "Family history",
            value: hasFamily ? "Mentioned in narrative" : "Not documented",
            status: hasFamily ? "captured" : "missing",
            editAction: () => onJumpToOverview("cardiovascular"),
          },
          {
            label: "Blood pressure",
            value: hasBP ? "Noted in narrative" : "Not documented",
            status: hasBP ? "captured" : "missing",
            editAction: () => onJumpToOverview("cardiovascular"),
          },
          {
            label: "Symptoms",
            value: hasSymptoms ? "Documented" : "Not documented",
            status: hasSymptoms ? "captured" : "missing",
            editAction: () => onJumpToOverview("cardiovascular"),
          }
        );
        break;
      }
      
      case "metabolic": {
        const hasDiabetes = /(diabetes|diabetic)/i.test(narrative);
        const hasGDM = /(gdm|gestational diabetes)/i.test(narrative);
        const hasWeightChange = /(weight.*change|weight.*stable|weight.*gain|weight.*loss)/i.test(narrative);
        const mealsPerDay = narrative.match(/(\d+)\s*(meal|meals)/i)?.[1] || null;
        const eatingWindow = narrative.match(/(\d+\.?\d*)\s*(hour|hr|h).*window/i)?.[1] || null;
        
        // Weight & metabolic history
        blocks.push(
          {
            label: "Diabetes",
            value: hasDiabetes ? "Yes" : "No",
            status: hasDiabetes ? "captured" : "missing",
            editAction: () => onJumpToOverview("metabolic"),
          },
          {
            label: "GDM",
            value: hasGDM ? "Yes" : "No",
            status: hasGDM ? "captured" : "missing",
            editAction: () => onJumpToOverview("metabolic"),
          },
          {
            label: "Weight changes",
            value: hasWeightChange ? (/(stable)/i.test(narrative) ? "Stable" : "Noted") : "Unknown",
            status: hasWeightChange ? "captured" : "missing",
            editAction: () => onJumpToOverview("metabolic"),
          }
        );
        
        // Eating pattern
        blocks.push(
          {
            label: "Meals/day",
            value: mealsPerDay ? `${mealsPerDay}` : "Unknown",
            status: mealsPerDay ? "captured" : "missing",
            editAction: () => onJumpToOverview("metabolic"),
          },
          {
            label: "Eating window",
            value: eatingWindow ? `~${eatingWindow}h` : "Unknown",
            status: eatingWindow ? "captured" : "missing",
            editAction: () => onJumpToOverview("metabolic"),
          }
        );
        break;
      }
      
      case "cancer": {
        const hasFamilyCRC = /(father|mother|parent|family).*(colon|colorectal|crc)/i.test(narrative);
        const hasFamilyBreast = /(father|mother|parent|family).*(breast.*cancer)/i.test(narrative);
        const hasOtherCancer = /(father|mother|parent|family).*(cancer|tumor)/i.test(narrative) && !hasFamilyCRC && !hasFamilyBreast;
        const hasColonoscopy = /(colonoscopy)/i.test(narrative);
        const hasMammography = /(mammogram|mammography)/i.test(narrative);
        
        // Family cancer history
        blocks.push(
          {
            label: "CRC",
            value: hasFamilyCRC ? "Yes" : "No",
            status: hasFamilyCRC ? "captured" : "missing",
            editAction: () => onJumpToOverview("cancer-screening"),
          },
          {
            label: "Breast",
            value: hasFamilyBreast ? "Yes" : "No",
            status: hasFamilyBreast ? "captured" : "missing",
            editAction: () => onJumpToOverview("cancer-screening"),
          },
          {
            label: "Other",
            value: hasOtherCancer ? "Yes" : "No",
            status: hasOtherCancer ? "captured" : "missing",
            editAction: () => onJumpToOverview("cancer-screening"),
          }
        );
        
        // Screening status
        blocks.push(
          {
            label: "Colonoscopy",
            value: hasColonoscopy ? "Done" : "Not done / Unknown",
            status: hasColonoscopy ? "captured" : "missing",
            editAction: () => onJumpToOverview("cancer-screening"),
          },
          {
            label: "Mammography",
            value: hasMammography ? "Up to date" : "Not applicable / Unknown",
            status: hasMammography ? "captured" : "missing",
            editAction: () => onJumpToOverview("cancer-screening"),
          }
        );
        break;
      }
      
      case "neuro": {
        const hasStress = intakeData.guidedReview.find(s => s.id === "stress")?.status === "reviewed";
        const hasMention = /(stress|anxiety|mood|depression|cognition|brain fog|attention|mental health)/i.test(narrative);
        
        blocks.push(
          {
            label: "Stress context",
            value: hasStress ? "Reviewed" : "Not reviewed",
            status: hasStress ? "captured" : "missing",
            editAction: () => onJumpToOverview("neuro"),
          },
          {
            label: "Cognitive/mental health",
            value: hasMention ? "Mentioned" : "Not documented",
            status: hasMention ? "captured" : "missing",
            editAction: () => onJumpToOverview("neuro"),
          }
        );
        break;
      }
      
      case "sleep": {
        const hasLifestyle = intakeData.guidedReview.find(s => s.id === "lifestyle")?.status === "reviewed";
        const hasSleep = /(sleep|insomnia|rest|tired|fatigue|snoring|awake|wake.*night)/i.test(narrative);
        
        blocks.push(
          {
            label: "Sleep quality",
            value: hasSleep ? "Mentioned" : "Not documented",
            status: hasSleep ? "captured" : "missing",
            editAction: () => onJumpToOverview("sleep"),
          },
          {
            label: "Lifestyle review",
            value: hasLifestyle ? "Reviewed (may include sleep)" : "Not reviewed",
            status: hasLifestyle ? "captured" : "missing",
            editAction: () => onJumpToOverview("sleep"),
          }
        );
        break;
      }
      
      case "fitness": {
        const hasLifestyle = intakeData.guidedReview.find(s => s.id === "lifestyle")?.status === "reviewed";
        const hasMovement = /(exercise|workout|running|walking|strength|cardio|movement|activity|sedentary)/i.test(narrative);
        
        blocks.push(
          {
            label: "Movement patterns",
            value: hasMovement ? "Mentioned" : "Not documented",
            status: hasMovement ? "captured" : "missing",
            editAction: () => onJumpToOverview("fitness"),
          },
          {
            label: "Activity baseline",
            value: hasLifestyle ? "Reviewed (may include movement)" : "Not reviewed",
            status: hasLifestyle ? "captured" : "missing",
            editAction: () => onJumpToOverview("fitness"),
          }
        );
        break;
      }
    }

    if (blocks.length === 0) return null;

    const handleEdit = (blockId: string, block: typeof blocks[0]) => {
      setEditingBlock(blockId);
      // Initialize edit values based on block type
      const initialValues: any = {};
      if (blockId.includes("family") && tabId === "cardiovascular") {
        initialValues.familyAge = "";
      }
      if (blockId.includes("bp")) {
        initialValues.bpPlan = "";
      }
      if (blockId.includes("symptom")) {
        initialValues.symptomStatus = "not_asked";
      }
      setEditValues(initialValues);
    };

    const handleSave = (blockId: string) => {
      // Save edits to intakeData
      const updates: Partial<Visit1IntakeData> = {};
      
      if (blockId.includes("family") && tabId === "cardiovascular") {
        // Add family history age to narrative or structured data
        const ageNote = editValues.familyAge ? ` (age ${editValues.familyAge})` : "";
        // In production, this would update structured data
        // For now, we'll add a note to openQuestions
        if (ageNote) {
          updates.openQuestions = intakeData.openQuestions
            ? `${intakeData.openQuestions}\n[Cardiovascular] Family history age${ageNote}`
            : `[Cardiovascular] Family history age${ageNote}`;
        }
      }
      
      if (blockId.includes("bp")) {
        if (editValues.bpPlan) {
          updates.openQuestions = intakeData.openQuestions
            ? `${intakeData.openQuestions}\n[Cardiovascular] BP plan: ${editValues.bpPlan}`
            : `[Cardiovascular] BP plan: ${editValues.bpPlan}`;
        }
      }
      
      if (blockId.includes("symptom")) {
        if (editValues.symptomStatus !== "not_asked") {
          const symptomNote = editValues.symptomStatus === "denied" ? "Symptoms denied" : "Symptoms confirmed";
          updates.openQuestions = intakeData.openQuestions
            ? `${intakeData.openQuestions}\n[Cardiovascular] ${symptomNote}`
            : `[Cardiovascular] ${symptomNote}`;
        }
      }
      
      // Save undo state
      setUndoStack([{ blockId, previousData: intakeData }, ...undoStack.slice(0, 4)]);
      
      // Apply updates
      if (Object.keys(updates).length > 0) {
        onUpdateIntakeData(updates);
      }
      
      // Clear editing state
      setEditingBlock(null);
      setEditValues({});
    };

    const handleCancel = () => {
      setEditingBlock(null);
      setEditValues({});
    };

    const handleUndo = () => {
      if (undoStack.length > 0) {
        const lastEdit = undoStack[0];
        // Restore previous data
        onUpdateIntakeData(lastEdit.previousData);
        setUndoStack(undoStack.slice(1));
      }
    };

    return (
      <div>
        <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-3">
          Confirmation
        </h3>
        <div className="space-y-2">
          {blocks.map((block, idx) => {
            const blockId = `${tabId}-${block.label.toLowerCase().replace(/\s+/g, "-")}`;
            const isEditing = editingBlock === blockId;
            
            return (
              <div
                key={idx}
                className={`bg-white border border-gray-200 rounded-[8px] ${isEditing ? "p-4" : "p-3"}`}
              >
                {!isEditing ? (
                  // Default view: Read-only display
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[12px] leading-[16px] font-medium text-gray-700">
                          {block.label}
                        </span>
                        {block.status === "captured" && (
                          <span className="text-[10px] text-green-600">✓</span>
                        )}
                        {block.status === "missing" && (
                          <span className="text-[10px] text-gray-400">—</span>
                        )}
                      </div>
                      <span className={`text-[11px] leading-[16px] ${
                        block.status === "missing" ? "text-gray-400 italic" : "text-gray-600"
                      }`}>
                        {block.status === "missing" ? `${block.value} (missing)` : block.value}
                      </span>
                    </div>
                    {block.editAction && (
                      <button
                        onClick={() => handleEdit(blockId, block)}
                        className="text-[11px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium flex-shrink-0 ml-2"
                        style={{ padding: "2px 6px" }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                ) : (
                  // Editing view: Inline edit form
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] leading-[16px] font-medium text-gray-700">
                        {block.label}
                      </span>
                      <div className="flex items-center gap-2">
                        {undoStack.length > 0 && (
                          <button
                            onClick={handleUndo}
                            className="text-[10px] leading-[14px] text-gray-500 hover:text-gray-700"
                            style={{ padding: "2px 4px" }}
                          >
                            Undo
                          </button>
                        )}
                        <button
                          onClick={handleCancel}
                          className="text-[11px] leading-[16px] text-gray-600 hover:text-gray-700"
                          style={{ padding: "2px 6px" }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSave(blockId)}
                          className="text-[11px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium"
                          style={{ padding: "2px 6px" }}
                        >
                          Done
                        </button>
                      </div>
                    </div>
                    
                    {/* Minimal edit fields based on block type */}
                    {blockId.includes("family") && tabId === "cardiovascular" && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Age of onset
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 52"
                          value={editValues.familyAge || ""}
                          onChange={(e) => setEditValues({ ...editValues, familyAge: e.target.value })}
                          onBlur={() => {
                            // Auto-save on blur
                            if (editValues.familyAge) {
                              handleSave(blockId);
                            }
                          }}
                          className="w-full px-2 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}
                    
                    {blockId.includes("bp") && tabId === "cardiovascular" && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          BP plan
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 7-day home BP log"
                          value={editValues.bpPlan || ""}
                          onChange={(e) => setEditValues({ ...editValues, bpPlan: e.target.value })}
                          onBlur={() => {
                            if (editValues.bpPlan) {
                              handleSave(blockId);
                            }
                          }}
                          className="w-full px-2 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}
                    
                    {blockId.includes("symptom") && tabId === "cardiovascular" && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-2">
                          Symptom status
                        </label>
                        <div className="flex gap-2">
                          {["denied", "confirmed", "not_asked"].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                setEditValues({ ...editValues, symptomStatus: status });
                                // Auto-save on selection
                                setTimeout(() => handleSave(blockId), 100);
                              }}
                              className={`px-3 py-1.5 text-[11px] leading-[16px] rounded-[6px] border transition-colors ${
                                editValues.symptomStatus === status
                                  ? "bg-blue-50 border-blue-300 text-blue-700"
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {status === "denied" ? "Denied" : status === "confirmed" ? "Confirmed" : "Not asked"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Metabolic domain edits */}
                    {tabId === "metabolic" && blockId.includes("lifestyle") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Mark lifestyle reviewed
                        </label>
                        <button
                          onClick={() => {
                            // Update guidedReview to mark lifestyle as reviewed
                            const updatedSections = intakeData.guidedReview.map(s =>
                              s.id === "lifestyle" ? { ...s, status: "reviewed" as const } : s
                            );
                            onUpdateIntakeData({ guidedReview: updatedSections });
                            setEditingBlock(null);
                          }}
                          className="px-3 py-1.5 text-[11px] leading-[16px] bg-blue-50 border border-blue-300 text-blue-700 rounded-[6px] hover:bg-blue-100"
                        >
                          Mark Reviewed
                        </button>
                      </div>
                    )}
                    
                    {tabId === "metabolic" && blockId.includes("weight") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Weight/BMI note
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., BMI 28, waist 36"
                          value={editValues.weightNote || ""}
                          onChange={(e) => setEditValues({ ...editValues, weightNote: e.target.value })}
                          onBlur={() => {
                            if (editValues.weightNote) {
                              const note = `[Metabolic] Weight: ${editValues.weightNote}`;
                              onUpdateIntakeData({
                                openQuestions: intakeData.openQuestions
                                  ? `${intakeData.openQuestions}\n${note}`
                                  : note,
                              });
                              setEditingBlock(null);
                            }
                          }}
                          className="w-full px-2 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}
                    
                    {/* Cancer domain edits */}
                    {tabId === "cancer" && blockId.includes("family") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Age of cancer diagnosis
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 48"
                          value={editValues.cancerAge || ""}
                          onChange={(e) => setEditValues({ ...editValues, cancerAge: e.target.value })}
                          onBlur={() => {
                            if (editValues.cancerAge) {
                              const note = `[Cancer] Family history age: ${editValues.cancerAge}`;
                              onUpdateIntakeData({
                                openQuestions: intakeData.openQuestions
                                  ? `${intakeData.openQuestions}\n${note}`
                                  : note,
                              });
                              setEditingBlock(null);
                            }
                          }}
                          className="w-full px-2 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}
                    
                    {tabId === "cancer" && blockId.includes("screening") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-2">
                          Screening status
                        </label>
                        <div className="flex gap-2">
                          {["up-to-date", "due", "not-applicable"].map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                const note = `[Cancer] Screening: ${status}`;
                                onUpdateIntakeData({
                                  openQuestions: intakeData.openQuestions
                                    ? `${intakeData.openQuestions}\n${note}`
                                    : note,
                                });
                                setEditingBlock(null);
                              }}
                              className={`px-3 py-1.5 text-[11px] leading-[16px] rounded-[6px] border transition-colors ${
                                editValues.screeningStatus === status
                                  ? "bg-blue-50 border-blue-300 text-blue-700"
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {status === "up-to-date" ? "Up to date" : status === "due" ? "Due" : "N/A"}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Neuro domain edits */}
                    {tabId === "neuro" && blockId.includes("stress") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Mark stress reviewed
                        </label>
                        <button
                          onClick={() => {
                            const updatedSections = intakeData.guidedReview.map(s =>
                              s.id === "stress" ? { ...s, status: "reviewed" as const } : s
                            );
                            onUpdateIntakeData({ guidedReview: updatedSections });
                            setEditingBlock(null);
                          }}
                          className="px-3 py-1.5 text-[11px] leading-[16px] bg-blue-50 border border-blue-300 text-blue-700 rounded-[6px] hover:bg-blue-100"
                        >
                          Mark Reviewed
                        </button>
                      </div>
                    )}
                    
                    {/* Sleep domain edits */}
                    {tabId === "sleep" && blockId.includes("sleep") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Sleep quality note
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 5-6 hours, interrupted"
                          value={editValues.sleepNote || ""}
                          onChange={(e) => setEditValues({ ...editValues, sleepNote: e.target.value })}
                          onBlur={() => {
                            if (editValues.sleepNote) {
                              const note = `[Sleep] Quality: ${editValues.sleepNote}`;
                              onUpdateIntakeData({
                                openQuestions: intakeData.openQuestions
                                  ? `${intakeData.openQuestions}\n${note}`
                                  : note,
                              });
                              setEditingBlock(null);
                            }
                          }}
                          className="w-full px-2 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}
                    
                    {/* Fitness domain edits */}
                    {tabId === "fitness" && blockId.includes("movement") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Activity level
                        </label>
                        <div className="flex gap-2">
                          {["sedentary", "light", "moderate", "active"].map((level) => (
                            <button
                              key={level}
                              onClick={() => {
                                const note = `[Fitness] Activity: ${level}`;
                                onUpdateIntakeData({
                                  openQuestions: intakeData.openQuestions
                                    ? `${intakeData.openQuestions}\n${note}`
                                    : note,
                                });
                                setEditingBlock(null);
                              }}
                              className={`px-3 py-1.5 text-[11px] leading-[16px] rounded-[6px] border transition-colors capitalize ${
                                editValues.activityLevel === level
                                  ? "bg-blue-50 border-blue-300 text-blue-700"
                                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Generic text input for other blocks */}
                    {!blockId.includes("family") && !blockId.includes("bp") && !blockId.includes("symptom") &&
                     !blockId.includes("lifestyle") && !blockId.includes("weight") && !blockId.includes("cancer") &&
                     !blockId.includes("screening") && !blockId.includes("stress") && !blockId.includes("sleep") &&
                     !blockId.includes("movement") && (
                      <div>
                        <label className="block text-[11px] leading-[16px] text-gray-600 mb-1">
                          Add note
                        </label>
                        <input
                          type="text"
                          placeholder="Add information..."
                          value={editValues.note || ""}
                          onChange={(e) => setEditValues({ ...editValues, note: e.target.value })}
                          onBlur={() => {
                            if (editValues.note) {
                              const note = `[${tabLabel}] ${editValues.note}`;
                              onUpdateIntakeData({
                                openQuestions: intakeData.openQuestions
                                  ? `${intakeData.openQuestions}\n${note}`
                                  : note,
                              });
                              setEditingBlock(null);
                            }
                          }}
                          className="w-full px-2 py-1.5 text-[12px] leading-[16px] border border-gray-300 rounded-[6px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const generateDecisionSupportSuggestions = (): Array<{
    text: string;
    why?: string;
    action?: { label: string; onClick: () => void };
  }> => {
    const narrative = intakeData.patientStory.narrative || "";
    const suggestions: Array<{
      text: string;
      why?: string;
      action?: { label: string; onClick: () => void };
    }> = [];

    switch (tabId) {
      case "cardiovascular": {
        const hasFamilyMI = /(father|mother|parent|family).*(mi|myocardial infarction|heart attack)/i.test(narrative);
        const hasFamilyStroke = /(father|mother|parent|family).*(stroke)/i.test(narrative);
        const hasAge = /\d+\s*(year|yr|age|old)/i.test(narrative);
        
        if ((hasFamilyMI || hasFamilyStroke) && !hasAge) {
          suggestions.push({
            text: "Age of MI missing → improves risk stratification",
            why: "Documenting age of onset improves risk stratification",
            action: {
              label: "Add to Orders draft",
              onClick: () => {
                // In production: add diagnostic to orders draft
                alert("Add family history age documentation to orders draft");
              },
            },
          });
        }
        
        if (hasFamilyMI || hasFamilyStroke) {
          suggestions.push({
            text: "Family MI + stroke history → advanced lipid baseline reasonable",
            why: "Strong family history warrants comprehensive lipid assessment",
            action: {
              label: "Add to Orders draft",
              onClick: () => {
                const cardioDiag = intakeData.suggestedDiagnostics.find(
                  d => d.category === "Cardiovascular risk"
                );
                if (cardioDiag) {
                  onUpdateIntakeData({
                    suggestedDiagnostics: intakeData.suggestedDiagnostics.map(d =>
                      d.id === cardioDiag.id ? { ...d, selected: true } : d
                    ),
                  });
                }
              },
            },
          });
        }
        break;
      }
      
      case "metabolic": {
        const hasLean = /(lean|thin|skinny)/i.test(narrative);
        const hasSedentary = /(sedentary|sitting|inactive)/i.test(narrative);
        const hasFamilyCVD = /(father|mother|parent|family).*(heart|cardiac|mi|stroke)/i.test(narrative);
        
        if (hasLean && hasSedentary && hasFamilyCVD) {
          suggestions.push({
            text: "Lean phenotype + family CVD → IR screening still reasonable",
            why: "Lean but sedentary pattern with CVD risk suggests possible IR",
            action: {
              label: "Add to Orders draft",
              onClick: () => {
                const metabolicDiag = intakeData.suggestedDiagnostics.find(
                  d => d.category === "Metabolic baseline"
                );
                if (metabolicDiag) {
                  onUpdateIntakeData({
                    suggestedDiagnostics: intakeData.suggestedDiagnostics.map(d =>
                      d.id === metabolicDiag.id ? { ...d, selected: true } : d
                    ),
                  });
                }
              },
            },
          });
        } else {
          suggestions.push({
            text: "No immediate metabolic red flags.",
            why: "Metabolic risk factors appear manageable",
          });
        }
        break;
      }
      
      case "cancer": {
        const hasFamilyCRC = /(father|mother|parent|family).*(colon|colorectal|crc)/i.test(narrative);
        const cancerAge = narrative.match(/(\d+).*(colon|colorectal|crc|age)/i)?.[1] || null;
        
        if (hasFamilyCRC) {
          if (cancerAge && parseInt(cancerAge) < 55) {
            suggestions.push({
              text: `Given family CRC around age ~${cancerAge}, earlier screening discussion is recommended.`,
              why: "Early family history may warrant earlier baseline screening",
            });
          } else {
            suggestions.push({
              text: "Given family CRC history, screening discussion is recommended.",
              why: "Family history warrants appropriate screening timing",
            });
          }
        }
        
        suggestions.push({
          text: "No urgent red flags identified.",
          why: "Cancer risk factors appear manageable",
        });
        break;
      }
      
      case "neuro": {
        const hasHighStress = /(high stress|significant stress)/i.test(narrative);
        const hasPoorSleep = /(poor sleep|insomnia|sleep.*problem)/i.test(narrative);
        
        if (hasHighStress && hasPoorSleep) {
          suggestions.push({
            text: "High stress + poor sleep may affect resilience",
            why: "Stress and sleep quality impact overall health and resilience",
          });
        } else {
          suggestions.push({
            text: "No neuro red flags at intake.",
            why: "Neurocognitive factors appear stable",
          });
        }
        break;
      }
      
      case "sleep": {
        const hasSnoring = /(snoring|snore)/i.test(narrative);
        const hasFatigue = /(fatigue|tired|exhausted)/i.test(narrative);
        
        if (hasSnoring && hasFatigue) {
          suggestions.push({
            text: "Consider evaluating if symptoms continue — not urgent.",
            why: "Snoring + fatigue may warrant sleep study discussion if persistent",
          });
        } else {
          suggestions.push({
            text: "Sleep patterns appear stable.",
            why: "No immediate sleep red flags identified",
          });
        }
        break;
      }
      
      case "fitness": {
        const hasCVD = /(father|mother|parent|family).*(heart|cardiac|mi|stroke)/i.test(narrative);
        const hasCardio = /(cardio|running|jogging|cycling|swimming|aerobic|zone 2)/i.test(narrative);
        
        if (hasCVD && !hasCardio) {
          suggestions.push({
            text: "Given cardiovascular context, light Zone 2 may help.",
            why: "CVD risk + no cardio mention suggests opportunity for cardiovascular fitness",
          });
        } else {
          suggestions.push({
            text: "Fitness patterns appear adequate.",
            why: "Activity levels seem appropriate",
          });
        }
        break;
      }
      
      case "plan": {
        const selectedLabs = intakeData.suggestedDiagnostics.filter(d => d.selected);
        const hasFollowUp = intakeData.openQuestions?.includes("Visit 2") || intakeData.openQuestions?.includes("follow-up");
        
        if (!hasFollowUp) {
          suggestions.push({
            text: "No follow-up planned yet.",
            why: "Follow-up scheduling helps ensure continuity of care",
          });
          suggestions.push({
            text: "Visit 2 usually scheduled after results return.",
            why: "Allows time for results review and planning",
          });
        }
        break;
      }
      
      case "documents": {
        const docCount = intakeData.documents?.count || 0;
        const hasFamilyDoc = intakeData.openQuestions?.includes("family history") || false;
        
        if (docCount > 0 && hasFamilyDoc) {
          suggestions.push({
            text: "Family history document uploaded — review recommended",
            why: "Family history documents provide important context for risk assessment",
          });
        }
        break;
      }
    }

    return suggestions.slice(0, 3); // Max 3 suggestions
  };

  const generateDocumentationList = (): string[] => {
    const items: string[] = [];

    switch (tabId) {
      case "cardiovascular":
        items.push("Family CVD history + ages");
        items.push("BP plan");
        items.push("Symptoms denied/confirmed");
        items.push("CVD bundle selected/declined + rationale");
        break;
      
      case "metabolic":
        items.push("Metabolic risk reviewed");
        items.push("Key lifestyle factors");
        items.push("Bundle selected/declined");
        break;
      
      case "cancer":
        items.push("Family cancer history + age");
        items.push("Screening status");
        items.push("Planned next steps + rationale");
        break;
      
      case "neuro":
        items.push("Neuro/cognition baseline");
        items.push("Stress overload acknowledged");
        items.push("Minimal plan");
        break;
      
      case "sleep":
        items.push("Sleep reviewed stable/unstable");
        items.push("Risks asked");
        items.push("Monitor vs investigate");
        break;
      
      case "fitness":
        items.push("Fitness baseline");
        items.push("Leverage points");
        break;
    }

    return items;
  };

  return (
    <>
      {/* Backdrop - subtle dim */}
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-20 z-40"
        onClick={onClose}
        style={{ backdropFilter: "blur(1px)" }}
      />
      
      {/* Drawer */}
      <div
        className="fixed top-0 bottom-0 left-[260px] bg-white shadow-2xl z-50 flex flex-col"
        style={{
          width: "480px",
          height: "calc(100vh - 64px)", // Account for header
          top: "64px", // Below header
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-[18px] leading-[26px] font-semibold text-gray-900">{tabLabel}</h2>
            {getStatusIndicator()}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          <div className="p-6 space-y-6">
            {/* Auto-generated Summary (Always first) */}
            <div>
              <h3 className="text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-3">
                Summary
              </h3>
              <div className="text-[13px] leading-[18px] text-gray-700 whitespace-pre-line bg-gray-50 rounded-[8px] p-4">
                {summary}
              </div>
              {/* Optional Hint as "Observation" line */}
              {tabHint && (
                <div className="mt-3 text-[12px] leading-[16px] text-gray-500 italic border-l-2 border-gray-300 pl-3">
                  <span className="font-medium text-gray-600">Observation: </span>
                  {tabHint}
                </div>
              )}
            </div>

            {/* Structured Confirmation Blocks (Compact, read-only by default) */}
            {generateConfirmationBlocks()}

            {/* Decision Support (Collapsible, quiet, collapsed by default) */}
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => toggleSection("decision-support")}
                className="w-full flex items-center justify-between text-[12px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2 hover:text-gray-700 transition-colors"
              >
                <span>Decision Support</span>
                <svg
                  className={`w-4 h-4 transition-transform ${expandedSections.has("decision-support") ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedSections.has("decision-support") && (
                <div className="space-y-3">
                  {generateDecisionSupportSuggestions().map((suggestion, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 rounded-[8px] p-3 border border-gray-200/50"
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="text-[12px] leading-[16px] text-gray-700 flex-1">
                          {suggestion.text}
                        </p>
                        {suggestion.action && (
                          <button
                            onClick={suggestion.action.onClick}
                            className="text-[11px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium flex-shrink-0"
                            style={{ padding: "2px 6px" }}
                          >
                            {suggestion.action.label}
                          </button>
                        )}
                      </div>
                      {suggestion.why && (
                        <p className="text-[11px] leading-[16px] text-gray-500 italic">
                          {suggestion.why}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What Will Be Documented (Tiny reassurance) */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-[11px] leading-[16px] font-normal text-gray-500 uppercase tracking-wide mb-2">
                What will be documented
              </h3>
              <div className="space-y-1.5">
                {generateDocumentationList().map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] leading-[16px] text-gray-600">
                    <span className="text-gray-400 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => onJumpToOverview(sectionId)}
            className="text-[12px] leading-[16px] text-blue-600 hover:text-blue-700 font-medium"
          >
            Jump to relevant section in Overview
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-[8px] hover:bg-blue-700 transition-colors text-[13px] leading-[18px] font-medium"
            style={{ height: "36px" }}
          >
            Back to Overview
          </button>
        </div>
      </div>
    </>
  );
}

