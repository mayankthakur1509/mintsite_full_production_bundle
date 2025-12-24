import { INTENT_WEIGHTS } from "./intentRules.js";

export function scoreSignals(signals = []) {
    let score = 0;

    for (const s of signals) {
        const weight =
            INTENT_WEIGHTS[s.component] ??
            INTENT_WEIGHTS.DEFAULT;

        score += weight;
    }

    return score;
}
