// export async function logEvent(env,data){
//   try {
//     await env.ACTIONE.put(`event-${Date.now()}`, JSON.stringify(data));
//   } catch(e){
//     console.error(e);
//   }
// }


// after form-free
export async function logEvent(env, signal) {
  try {
    // Hard guard — NEVER crash worker
    if (!env || !env.ACTION_E_LOG) {
      console.warn("⚠️ ACTION_E_LOG not available, skipping log");
      return;
    }

    if (!signal?.session_id) {
      console.warn("⚠️ Missing session_id, skipping log");
      return;
    }

    const key = `signal:${signal.session_id}:${signal.ts}`;

    await env.ACTION_E_LOG.put(
      key,
      JSON.stringify(signal)
    );

    console.log("KV WRITE:", key);

  } catch (e) {
    console.error("logEvent error", e);
  }
}