//
import React from "react";

export default function OutcomeBlock({ outcomes }) {
  return (
    <section className="outcomes">
      <h2>Measurable Outcomes</h2>
      <ul>
        {outcomes.map(o => <li key={o.id}>{o.text}</li>)}
      </ul>
    </section>
  );
}
