//
import React from "react";
import ValuePillars from "./ValuePillars";
import OutcomeBlock from "./OutcomeBlock";
import CaseStudies from "./CaseStudies";


export default function VFLP_CEO({ persona, lawyer, practice, model }) {
  return (
    <div className="mintsite">
      <section className="hero">
        <h1>{practice.name} — CEO View</h1>
        <p>Growth, expansion, global stability.</p>
      </section>

      <ValuePillars pillars={model.value_map} />
      <OutcomeBlock outcomes={model.outcomes} />
      <CaseStudies items={model.case_studies} persona="ceo" />
      {/* <CTA /> */}
    </div>
  );
}
