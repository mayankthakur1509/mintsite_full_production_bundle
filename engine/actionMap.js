export function resolveAction({ stage, persona, practice }) {

    // FINAL CONVERSION STAGE
    if (stage === "DECISION") {
        if (persona === "cfo") return "CONTACT_FORM";
        if (persona === "ceo") return "REQUEST_STRATEGY_CALL";
        if (persona === "gc") return "OPEN_CHAT";
        return "CONTACT_FORM"; // default
    }

    // TRUST BUILDING STAGE
    if (stage === "HIGH_INTENT") {
        return "SHOW_CASE_STUDY";
    }

    return "NO_ACTION";
}
