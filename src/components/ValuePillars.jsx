//
import React from "react";

export default function ValuePillars({ pillars }) {
  return (
    <section className="pillars">
      <h2>Value Pillars</h2>
      {pillars.map(p => (
        <div key={p.pillar} className="pillar">
          <h3>{p.pillar}</h3>
          <ul>
            {p.signals?.map(s => <li key={s}>{s}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}
