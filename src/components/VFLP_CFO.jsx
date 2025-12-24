//
import React from "react";
import ValuePillars from "./ValuePillars";
import OutcomeBlock from "./OutcomeBlock";
import CaseStudies from "./CaseStudies";

export default function VFLP_CFO({ persona, lawyer, practice, model }) {
  return (
    <div className="mintsite">
      <section className="hero">
        <h1>{practice.name} — CFO View</h1>
        <p>Financial clarity, compliance, risk mitigation.</p>
      </section>

      <ValuePillars pillars={model.value_map} />
      <OutcomeBlock outcomes={model.outcomes} />
      {/* <Differentiators items={model.value_map} /> */}
      <CaseStudies items={model.case_studies} persona="cfo" />

      {/* <CTA /> */}
    </div>
  );
}
