//
import React from "react";

export default function CaseStudyCard({ item }) {
  return (
    <div className="case-study-card">
      <h3>{item.headline}</h3>
      <p>{item.summary}</p>
      <strong>Outcomes:</strong>
      <ul>
        {item.outcomes?.map(o => <li key={o}>{o}</li>)}
      </ul>
    </div>
  );
}
