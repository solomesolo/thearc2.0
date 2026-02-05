"use client";

import React, { useState } from "react";

interface FAQAccordionProps {
  question: string;
  answer: string;
  index?: number;
}

export function FAQAccordion({ question, answer, index = 0 }: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`arc-faq-accordion-item ${isOpen ? 'arc-faq-accordion-item-open' : 'arc-faq-accordion-item-closed'}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Left indicator strip (open only) */}
      {isOpen && <div className="arc-faq-accordion-indicator" />}
      
      <button
        className="arc-faq-accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="arc-faq-accordion-question">{question}</span>
        <span 
          className={`arc-faq-accordion-icon ${isOpen ? "arc-faq-accordion-icon-open" : ""}`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5" />
            ) : (
              <path d="M9 4.5V13.5M4.5 9H13.5" />
            )}
          </svg>
        </span>
      </button>
      <div
        className={`arc-faq-accordion-body ${isOpen ? "arc-faq-accordion-body-open" : ""}`}
      >
        <div className="arc-faq-accordion-divider" />
        <p className="arc-faq-accordion-answer">{answer}</p>
      </div>
    </div>
  );
}

