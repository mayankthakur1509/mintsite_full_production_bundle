//
import CaseStudyCard from "./CaseStudyCard";
import React from "react";

export default function CaseStudies({ items, persona }) {
  const filtered = items.filter(i => i.persona === persona || !i.persona);
  return (
    <section>
      <h2>Case Studies</h2>
      <div className="case-grid">
        {filtered.map(i => <CaseStudyCard key={i.id} item={i} />)}
      </div>
    </section>
  );
}
