export async function recordOutcome({ env, session_id, outcome, meta = {} }) {
    const payload = {
        session_id,
        outcome,
        meta,
        ts: Date.now()
    };

    await env.ACTION_E_LOG.put(
        `outcome:${session_id}:${Date.now()}`,
        JSON.stringify(payload)
    );

    console.log("✅ OUTCOME RECORDED:", payload);
}
