import React from "react";

import LawyerProfile from "./LawyerProfile";
import ValuePillars from "./ValuePillars";
import OutcomeBlock from "./OutcomeBlock";
import CaseStudies from "./CaseStudies";

export default function AuthorityPage({ site, lawyers, practices, value_map, outcomes, case_studies }) {


  return (
    <div className="mintsi-container">
      <header className="mintsite-hero">
        <h1>{site.firm_name}</h1>
        <p>Trusted expertise. Measurable global outcomes.</p>
      </header>

      <section>
        <h2>Our Attorneys</h2>
        <div className="grid">
          {lawyers.map(l => <LawyerProfile key={l.id} lawyer={l} />)}
        </div>
      </section>

      <section>
        <h2>Practice Areas</h2>
        <ul>
          {practices.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      </section>

      <ValuePillars pillars={value_map} />
      <OutcomeBlock outcomes={outcomes} />
      <CaseStudies items={case_studies} />

      <footer className="cta">
        <a href="/contact" className="mintsite-btn">Schedule a Consultation</a>
      </footer>
    </div>
  );
}
