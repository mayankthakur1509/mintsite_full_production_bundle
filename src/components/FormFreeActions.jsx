// src/components/FormFreeActions.jsx
import React from "react";
import ContactForm from "./ContactForm";
import StrategyCallButton from "./StrategyCallButton";
import ChatWidget from "./ChatWidget";
import CaseStudyModal from "./CaseStudyModal";

export default function FormFreeActions({ __mintAction }) {
  if (!__mintAction || __mintAction === "NONE") return null;
console.log("__mintAction",__mintAction)
  switch (__mintAction) {
    case "CONTACT_FORM":
      return <ContactForm />;
    case "REQUEST_STRATEGY_CALL":
      return <StrategyCallButton />;
    case "OPEN_CHAT":
      return <ChatWidget />;
    case "SHOW_CASE_STUDY":
      return <CaseStudyModal />;
    default:
      return null;
  }
}
