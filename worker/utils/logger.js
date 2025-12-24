export async function logEvent(env,data){
  try {
    await env.ACTIONE.put(`event-${Date.now()}`, JSON.stringify(data));
  } catch(e){
    console.error(e);
  }
}
