// //
// import React from "react";
// import ValuePillars from "./ValuePillars";
// import OutcomeBlock from "./OutcomeBlock";
// import CaseStudies from "./CaseStudies";

// export default function VFLP_GC({ persona, lawyer, practice, model }) {
//   return (
//     <div className="mintsite">
//       <section className="hero">
//         <h1>{practice.name} — General Counsel View</h1>
//         <p>Compliance certainty, minimized exposure, defensible decisions.</p>
//       </section>

//       <ValuePillars pillars={model.value_map} />
//       <OutcomeBlock outcomes={model.outcomes} />
//       <CaseStudies items={model.case_studies} persona="gc" />
//       {/* <CTA /> */}
//     </div>
//   );
// }


import React from "react";
import VFLP_Template from "./VFLP_Template";
export default function VFLP_GC(props) { return <VFLP_Template {...props} />; }

