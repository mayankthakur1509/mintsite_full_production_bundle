// src/components/VFLP_Template.jsx
import React from "react";
import FormFreeActions from "../components/FormFreeActions";

export default function VFLP_Template({ persona, lawyer, practice, model, __mintAction  }) {
  // Fallback: if lawyer not provided, take the first lawyer in this practice
  const practiceLawyers = model?.lawyers?.filter(l => l.practices?.includes(practice.id)) || [];
  const displayLawyer = lawyer || practiceLawyers[0] || {};

  return (
    <div className="mintsite vflp">
      <header className="vflp-header">
        <h1>{persona?.id?.toUpperCase() || "Advisory"} Advisory View</h1>
        <p>
          Tailored for {persona?.id?.toUpperCase() || "executives"} consulting on {practice?.name || "this practice"}.
        </p>
      </header>

      {displayLawyer.name && (
        <section style={{ marginBottom: "2rem" }}>
          <h2>Advisor Highlight</h2>
          <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', maxWidth: '400px' }}>
            <h3>{displayLawyer.name}</h3>
            <p>{displayLawyer.title}</p>
            <p>{displayLawyer.bio}</p>
            <p><strong>Practice Areas:</strong> {displayLawyer.practices?.join(", ")}</p>
          </div>
        </section>
      )}

      <section style={{ marginBottom: "2rem" }}>
        <h2>Key Advisory Insights</h2>
        <ul>
          <li>✔ Risk reduction strategies</li>
          <li>✔ Global compliance recommendations</li>
          <li>✔ Efficiency improvements for executive decision-making</li>
        </ul>
      </section>

      {/* Form-Free Action injected by the worker */}
      <FormFreeActions __mintAction={__mintAction} />


      {/* <section style={{ marginBottom: "2rem" }}>
        <h2>Sample Case Study</h2>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
          <p>
            {displayLawyer.name || "Our team"} assisted a {persona?.id?.toUpperCase() || "client"} in {practice?.name || "this practice"}, achieving measurable outcomes.
          </p>
        </div>
      </section>

      <footer style={{ marginTop: "2rem" }}>
        <a href="/contact" className="button-primary">Schedule a Consultation</a>
      </footer> */}
    </div>
  );
}
