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
      className="faq-accordion-item animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        className="faq-accordion-header focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-page)]"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span className="faq-accordion-question">{question}</span>
        <span 
          className={`faq-accordion-icon ${isOpen ? "faq-accordion-icon-open" : ""}`}
        >
          +
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        role="region"
        aria-labelledby={`faq-question-${index}`}
        className={`faq-accordion-body ${isOpen ? "faq-accordion-body-open" : ""}`}
      >
        <p className="faq-accordion-answer">{answer}</p>
      </div>
    </div>
  );
}

