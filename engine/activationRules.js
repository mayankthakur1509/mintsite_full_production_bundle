export function getIntentStage(score) {
    if (score >= 80) return "DECISION";
    if (score >= 60) return "HIGH_INTENT";
    if (score >= 30) return "CONSIDERATION";
    return "AWARENESS";
}
