import { resolveRoute } from "../engine/router.js";
import { logEvent } from "./utils/logger.js";
import { renderer as ssrRenderer } from "../src/renderer";
import { scoreSignals } from "../engine/intentScorer.js";
import { getIntentStage } from "../engine/activationRules.js";
import { resolveAction } from "../engine/actionMap.js";
import { executeAction } from "../engine/actionExecutor.js";
import { detectDrift } from "../engine/driftDetector.js";
import { applyOutcomeFeedback } from "../engine/applyOutcomeFeedback.js";

function getSessionId(req) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/mintsid=([^;]+)/);
  if (match) return match[1];

  return crypto.randomUUID();
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);

    // form-free session & signal capture
    const sessionId = getSessionId(req);

    const persona = url.searchParams.get("p") || "default";



    // -------------------------------
    // STEP 4 — FORM SUBMIT FINALIZATION
    // -------------------------------
    if (url.pathname === "/__mint_outcome" && req.method === "POST") {
      const body = await req.json();
      console.log("body", body)

      await env.ACTION_E_LOG.put(
        `outcome:${sessionId}:${Date.now()}`,
        JSON.stringify({
          session_id: sessionId,
          outcome: body.outcome || "form_submitted",
          meta: body.meta || {},
          ts: Date.now(),
        })
      );

      await env.ACTION_E_LOG.put(
        `terminal:${sessionId}`,
        JSON.stringify({ status: "converted", ts: Date.now() })
      );

      await env.ACTION_E_LOG.put(
        `cooldown:${sessionId}`,
        JSON.stringify({ until: Date.now() + 1000 * 60 * 60 * 24, reason: "form_submitted" })
      );

      await env.ACTION_E_LOG.put(
        `lead:${sessionId}`,
        JSON.stringify({
          session_id: sessionId,
          name: body.meta?.name,
          email: body.meta?.email,
          lawyer: body.meta?.lawyer,
          practice: body.meta?.practice,
          persona: body.meta?.persona,
          intent_score: body.meta?.score || null,
          ts: Date.now(),
        })
      );

      return new Response("ok", { status: 200 });
    }

    const route = resolveRoute(url.pathname, persona);

    if (!route) {
      return new Response("Not Found", { status: 404 });
    }


    // -------------------------------
    // NORMALIZED FORM-FREE SIGNAL
    // -------------------------------
    const signal = {
      session_id: sessionId,
      ts: Date.now(),
      route: url.pathname,
      persona,
      component: route.component,
      lawyer: route.props?.lawyer?.id || null,
      practice: route.props?.practice?.id || null,
      signal: "page_view"
    };

    console.log("FORM-FREE SIGNAL:", signal);



    // ctx.waitUntil(logEvent(env, {
    //   type: "page_visit",
    //   route: url.pathname,
    //   persona,
    //   ts: Date.now()
    // }));


    ctx.waitUntil(
      logEvent(env, signal)
    );


    // -------------------------------
    // READ SESSION SIGNALS (FORM-FREE)
    // -------------------------------
    let signals = [];

    try {
      const list = await env.ACTION_E_LOG.list({
        prefix: `signal:${sessionId}:`
      });

      for (const k of list.keys) {
        const val = await env.ACTION_E_LOG.get(k.name);
        if (val) signals.push(JSON.parse(val));
      }
    } catch (e) {
      console.warn("Signal read failed", e);
    }


    let outcomes = [];

    try {
      const list = await env.ACTION_E_LOG.list({
        prefix: `outcome:${sessionId}:`
      });

      for (const k of list.keys) {
        const val = await env.ACTION_E_LOG.get(k.name);
        if (val) outcomes.push(JSON.parse(val));
      }
    } catch (e) {
      console.warn("Outcome read failed", e);
    }




    // const intentScore = scoreSignals(signals);
    // console.log("🧠 INTENT SCORE:", intentScore);

    const baseIntent = scoreSignals(signals);
    const intentScore = applyOutcomeFeedback(baseIntent, outcomes);
    console.log("🧠 INTENT SCORE (with outcomes):", intentScore);

    const intentStage = getIntentStage(intentScore);
    console.log("🚦 INTENT STAGE:", intentStage);


    if (intentStage === "HIGH_INTENT" || intentStage === "DECISION") {
      const activationKey = `activation:${sessionId}`;

      const alreadyActivated = await env.ACTION_E_LOG.get(activationKey);
      console.log("🔥 alreadyActivated:", alreadyActivated);

      if (!alreadyActivated) {
        const activationPayload = {
          session_id: sessionId,
          stage: intentStage,
          persona,
          lawyer: signal.lawyer,
          practice: signal.practice,
          score: intentScore,
          ts: Date.now()
        };

        await env.ACTION_E_LOG.put(
          activationKey,
          JSON.stringify(activationPayload)
        );

        console.log("🔥 ACTIVATION TRIGGERED:", activationPayload);
      }
    }

    const terminal = await env.ACTION_E_LOG.get(`terminal:${sessionId}`);


    const action = resolveAction({
      stage: intentStage,
      persona,
      practice: signal.practice
    });

    console.log("🎯 NEXT ACTION:", action);


    let ctaAction = "NONE";

    if (terminal) {
      console.log("🛑 TERMINAL SESSION — CTA SUPPRESSED");
    } else if (action !== "NO_ACTION") {
      ctaAction = action;
    }


    // -------------------------------
    // ACTIVATION COOLDOWN GUARD
    // -------------------------------
    const cooldownKey = `cooldown:${sessionId}:${action}`;
    const cooldownRaw = await env.ACTION_E_LOG.get(cooldownKey);

    if (!terminal && action !== "NO_ACTION") {
      let canExecute = true;

      if (cooldownRaw) {
        const cooldown = JSON.parse(cooldownRaw);
        if (Date.now() < cooldown.until) {
          console.log("⏳ ACTIVATION SKIPPED (COOLDOWN ACTIVE):", cooldown);
          canExecute = false;
        }
      }

      if (canExecute) {
        await executeAction({ action, signal, env });

        // Set cooldown for this action
        await env.ACTION_E_LOG.put(
          cooldownKey,
          JSON.stringify({
            until: Date.now() + 1000 * 60 * 10, // 10 min
            reason: "action_executed"
          })
        );
      }
    }

    const drift = detectDrift(signals);

    if (drift) {
      console.log("🌊 INTENT DRIFT DETECTED:", drift);

      await env.ACTION_E_LOG.put(
        `outcome:${sessionId}:${Date.now()}`,
        JSON.stringify({
          session_id: sessionId,
          outcome: "ignored_cta",
          meta: { reason: "persona_drift", drift },
          ts: Date.now()
        })
      );

      // Cooldown is only for drift, separate from actions
      await env.ACTION_E_LOG.put(
        `cooldown:${sessionId}:DRIFT`,
        JSON.stringify({
          until: Date.now() + 1000 * 60 * 5, // 5 min drift cooldown
          reason: "persona_drift"
        })
      );
    }


    // const html = await env.RENDERER.render(route.component, route.props);
    // const renderer = env.RENDERER || mockRenderer;
    // const html = await renderer.render(route.component, route.props);
    // const html = await ssrRenderer.render(route.component, route.props);


    // return new Response(htmlBody, {
    //   headers: {
    //     "Content-Type": "text/html",
    //     "Cache-Control": "public, max-age=120"
    //   }
    // });


    // const html = await ssrRenderer.render(
    //   route.component,
    //   {
    //     ...route.props,
    //     __mintAction: ctaAction   // ← THIS MUST EXIST
    //   }
    // );



    //   // Serve HTML
    //   const htmlBody = await ssrRenderer.render(route.component, route.props);

    //   const fullHTML = `
    //   <!DOCTYPE html>
    //   <html lang="en">
    //   <head>
    //     <meta charset="UTF-8" />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    //     <title>${route.props.site?.firm_name || "MintSite"}</title>
    //     <link rel="stylesheet" href="/style.css" />
    //   </head>
    //   <body>
    //     ${htmlBody}
    //   </body>
    //   </html>
    // `;

    // Return fullHTML so that CSS is included
    // return new Response(fullHTML, {
    //   headers: {
    //     "Content-Type": "text/html",
    //     "Cache-Control": "public, max-age=120"
    //   }
    // });


    const appHtml = await ssrRenderer.render(route.component, {
      ...route.props,
      __mintAction: ctaAction
    });


    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>MintSite</title>
          <link rel="stylesheet" href="/style.css" />

        </head>
        <body>
          <div id="root">${appHtml}</div>

          <script>
            window.__MINT_COMPONENT__ = "${route.component}";
            window.__INITIAL_PROPS__ = ${JSON.stringify({
      ...route.props,
      __mintAction: ctaAction
    })
      }
      
        </script>

        <script type="module" src="/client.js"></script>
      </body>
    </html>`;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
        "Set-Cookie": `mintsid=${sessionId}; Path=/; HttpOnly`,
        "X-Mint-Action": ctaAction,        // IMPORTANT
        "Cache-Control": "public, max-age=120"
      }
    });

  }
};
