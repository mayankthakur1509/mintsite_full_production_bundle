import { recordOutcome } from "./outcomeRecorder.js";


export async function executeAction({ action, signal, env }) {
    switch (action) {

        case "CONTACT_FORM":
            console.log("📨 EXECUTE → CONTACT_FORM");

            await recordOutcome({
                env,
                session_id: signal.session_id,
                outcome: "form_opened",
                meta: {
                    lawyer: signal.lawyer,
                    practice: signal.practice,
                    persona: signal.persona
                }
            });

            break;


        case "REQUEST_STRATEGY_CALL":
            await env.ACTION_E_LOG.put(
                `outcome:${signal.session_id}:${Date.now()}`,
                JSON.stringify({
                    session_id: signal.session_id,
                    outcome: "strategy_call_prompted",
                    meta: { persona: signal.persona },
                    ts: Date.now()
                })
            );
            break;

        case "OPEN_CHAT":
            await env.ACTION_E_LOG.put(
                `outcome:${signal.session_id}:${Date.now()}`,
                JSON.stringify({
                    session_id: signal.session_id,
                    outcome: "chat_opened",
                    ts: Date.now()
                })
            );
            break;

        case "SHOW_CASE_STUDY":
            await env.ACTION_E_LOG.put(
                `outcome:${signal.session_id}:${Date.now()}`,
                JSON.stringify({
                    session_id: signal.session_id,
                    outcome: "case_study_shown",
                    meta: {
                        lawyer: signal.lawyer,
                        practice: signal.practice
                    },
                    ts: Date.now()
                })
            );
            break;
            console.log("⛔ NO ACTION EXECUTED");
    }
}
