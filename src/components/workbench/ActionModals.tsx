"use client";

import React, { useState } from "react";
import { logAuditEvent } from "@/lib/workbenchTypes";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  queueItemId: string;
  patientId: string;
}

export function CallModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "call_patient",
      actionType: "call",
      metadata: { notes },
    });
    onSubmit({ notes });
    setNotes("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Call Patient</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Call notes (optional)"
          className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            className="flex-1 h-8 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            Complete Call
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function MessageModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "send_message",
      actionType: "message",
      metadata: { message },
    });
    onSubmit({ message });
    setMessage("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Send Message</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message to patient"
          className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="flex-1 h-8 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ScheduleModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [visitType, setVisitType] = useState("Follow-up");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "schedule_visit",
      actionType: "schedule",
      metadata: { visitType, date, notes },
    });
    onSubmit({ visitType, date, notes });
    setVisitType("Follow-up");
    setDate("");
    setNotes("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Schedule Visit</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={visitType}
            onChange={(e) => setVisitType(e.target.value)}
            placeholder="Visit type"
            className="w-full h-8 px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-8 px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            disabled={!date}
            className="flex-1 h-8 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Schedule
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function TaskModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "create_task",
      actionType: "task",
      metadata: { title, description },
    });
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Create Task</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full h-8 px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            disabled={!title.trim()}
            className="flex-1 h-8 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function DelegateModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [assignee, setAssignee] = useState("");
  const [instruction, setInstruction] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "delegate_to_team",
      actionType: "delegate",
      metadata: { assignee, instruction, followUpDate },
    });
    onSubmit({ assignee, instruction, followUpDate });
    setAssignee("");
    setInstruction("");
    setFollowUpDate("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Delegate to Team</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <select
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full h-8 px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select assignee</option>
            <option value="nurse">Nurse</option>
            <option value="coach">Coach</option>
            <option value="team-member">Team Member</option>
          </select>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Instruction note (required)"
            className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            placeholder="Follow-up date"
            className="w-full h-8 px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            disabled={!assignee || !instruction.trim()}
            className="flex-1 h-8 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Delegate
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

interface ResolveModalProps extends BaseModalProps {
  patientName: string;
}

export function ResolveModal({ isOpen, onClose, onSubmit, queueItemId, patientId, patientName }: ResolveModalProps) {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "resolve_trigger",
      actionType: "resolve",
      metadata: { note },
    });
    onSubmit({ note });
    setNote("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Resolve Trigger</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">Mark this trigger as resolved for {patientName}.</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Resolution note (optional)"
          className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            className="flex-1 h-8 px-4 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
          >
            Resolve
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function SnoozeModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [snoozeUntil, setSnoozeUntil] = useState("later-today");
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "snooze_trigger",
      actionType: "snooze",
      metadata: { snoozeUntil, reason },
    });
    onSubmit({ snoozeUntil, reason });
    setSnoozeUntil("later-today");
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Snooze Trigger</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Snooze until</label>
            <div className="space-y-1">
              {['later-today', 'tomorrow', 'next-week'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={option}
                    checked={snoozeUntil === option}
                    onChange={(e) => setSnoozeUntil(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    {option === 'later-today' ? 'Later today' : option === 'tomorrow' ? 'Tomorrow' : 'Next week'}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Reason (required)</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-8 px-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select reason</option>
              <option value="awaiting-reply">Awaiting patient reply</option>
              <option value="awaiting-labs">Awaiting labs</option>
              <option value="needs-info">Needs more info</option>
              <option value="delegated">Delegated follow-up</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            disabled={!reason}
            className="flex-1 h-8 px-4 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            Snooze
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function EscalateModal({ isOpen, onClose, onSubmit, queueItemId, patientId }: BaseModalProps) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    logAuditEvent({
      queueItemId,
      patientId,
      action: "escalate_trigger",
      actionType: "escalate",
      metadata: { reason },
    });
    onSubmit({ reason });
    setReason("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-4 w-[360px] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-medium text-gray-900">Escalate Trigger</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-3">Raise urgency and alert care team.</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for escalation (required)"
          className="w-full min-h-[64px] p-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className="flex-1 h-8 px-4 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Escalate
          </button>
          <button
            onClick={onClose}
            className="px-4 h-8 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}




