"use client";

import { ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa";

export type VisualVariant = "timeline" | "split" | "spotlight" | "grid";
export type MotionVariant = "lift" | "slide" | "glow" | "reveal";

export type AccordionSectionProps = {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  previewPoints: string[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  visualVariant: VisualVariant;
  motionVariant: MotionVariant;
  children: ReactNode;
};

export default function AccordionSection({
  id,
  title,
  tagline,
  tags,
  previewPoints,
  isOpen,
  onToggle,
  className,
  visualVariant,
  motionVariant,
  children,
}: AccordionSectionProps) {
  const headingId = `${id}-heading`;

  return (
    <article
      className={`portfolio-card variant-${visualVariant} motion-${motionVariant} ${className ?? ""}`}
    >
      <button
        id={headingId}
        type="button"
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={id}
      >
        <div>
          <h2 className="accordion-title">{title}</h2>
          <p className="accordion-tagline">{tagline}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={`${id}-${tag}`} className="chip-muted">
                {tag}
              </span>
            ))}
          </div>
          <ul className="accordion-preview">
            {previewPoints.map((point) => (
              <li key={`${id}-${point}`}>{point}</li>
            ))}
          </ul>
        </div>
        <span className={`accordion-chevron ${isOpen ? "open" : ""}`}>
          <FaChevronDown aria-hidden="true" />
          <span className="sr-only">Toggle details</span>
        </span>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={headingId}
        className={`accordion-panel ${isOpen ? "open" : ""}`}
      >
        <div className="accordion-body">{children}</div>
      </div>
    </article>
  );
}
