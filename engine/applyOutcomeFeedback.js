import { OUTCOME_WEIGHTS } from "./outcomeWeights.js";

export function applyOutcomeFeedback(intentScore, outcomes = []) {
    let score = intentScore;

    for (const o of outcomes) {
        const weight = OUTCOME_WEIGHTS[o.outcome];
        if (weight) score += weight;
    }

    return score;
}
