// import React from "react";
// import { hydrateRoot } from "react-dom/client";
// import VFLP_Template from "../components/VFLP_Template";

// const props = window.__INITIAL_PROPS__;

// hydrateRoot(
//     document.getElementById("root"),
//     <VFLP_Template {...props} />
// );


// client.js



// import React from "react";
// import ReactDOM from "react-dom/client";

// import AuthorityPage from "../components/AuthorityPage.jsx";
// import VFLP_Template from "../components/VFLP_Template";

// import CaseStudies from "../components/CaseStudies.jsx";
// import CaseStudyCard from "../components/CaseStudyCard.jsx";
// import CaseStudyModal from "../components/CaseStudyModal.jsx";
// import ChatWidget from "../components/ChatWidget.jsx";
// import ContactForm from "../components/ContactForm.jsx";
// import FormFreeActions from "../components/FormFreeActions.jsx";
// import LawyerProfile from "../components/LawyerProfile.jsx";
// import OutcomeBlock from "../components/OutcomeBlock.jsx";
// import PracticePage from "../components/PracticePage.jsx";
// import StrategyCallButton from "../components/StrategyCallButton.jsx";
// import ValuePillars from "../components/ValuePillars.jsx";
// import VFLP_CEO from "../components/VFLP_CEO.jsx";
// import VFLP_CFO from "../components/VFLP_CFO.jsx";
// import VFLP_GC from "../components/VFLP_GC.jsx";


// // map string to real component
// const COMPONENT_MAP = {
//     AuthorityPage,
//     VFLP_Template,
//     CaseStudies,
//     CaseStudyCard,
//     CaseStudyModal,
//     ChatWidget,
//     ContactForm,
//     FormFreeActions,
//     LawyerProfile,
//     OutcomeBlock,
//     PracticePage,
//     StrategyCallButton,
//     ValuePillars,
//     VFLP_CEO,
//     VFLP_CFO,
//     VFLP_GC,
// };


// const ComponentName = window.__MINT_COMPONENT__;
// console.log("Client hydrating component111:", window.__MINT_COMPONENT__);

// const Component = COMPONENT_MAP[ComponentName];

// if (!Component) throw new Error(`Unknown component: ${ComponentName}`);

// const props = window.__INITIAL_PROPS__;

// console.log("Hydration props:", props); // debug

// ReactDOM.hydrateRoot(
//     document.getElementById("root"),
//     React.createElement(Component, props)
// );


import React from "react";
import { hydrateRoot } from "react-dom/client";

// ✅ SAME COMPONENTS AS SSR
import AuthorityPage from "../components/AuthorityPage.jsx";
import LawyerProfile from "../components/LawyerProfile.jsx";
import PracticePage from "../components/PracticePage.jsx";
import VFLP_Template from "../components/VFLP_Template.jsx";

// ✅ MUST MATCH renderer/index.js EXACTLY
const COMPONENT_MAP = {
    AuthorityPage,
    LawyerProfile,
    PracticePage,
    VFLP_Template
};

const ComponentName = window.__MINT_COMPONENT__;
const props = window.__INITIAL_PROPS__;

console.log("🧩 Hydrating component:", ComponentName);
console.log("📦 Initial props:", props);

const Component = COMPONENT_MAP[ComponentName];

if (!Component) {
    console.error("❌ Unknown component:", ComponentName);
} else {
    hydrateRoot(
        document.getElementById("root"),
        <Component {...props} />
    );
}
