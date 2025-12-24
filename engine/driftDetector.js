export function detectDrift(signals) {
    if (!signals || signals.length < 3) return null;

    const recent = signals.slice(-3);

    const personas = new Set(recent.map(s => s.persona));
    const practices = new Set(recent.map(s => s.practice));
    const components = recent.map(s => s.component);

    // Persona drift
    if (personas.size > 1) {
        return {
            type: "PERSONA_DRIFT",
            detail: [...personas]
        };
    }

    // Practice drift
    if (practices.size > 1) {
        return {
            type: "PRACTICE_DRIFT",
            detail: [...practices]
        };
    }

    // Cooling drift (backing away from VFLP)
    const last = components[components.length - 1];
    if (!last.startsWith("VFLP")) {
        return {
            type: "INTENT_COOLING",
            detail: components
        };
    }

    return null;
}
