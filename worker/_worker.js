import { resolveRoute } from "../engine/router.js";
import { logEvent } from "./utils/logger.js";
import { renderer as ssrRenderer } from "../src/renderer";


export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);

    const persona = url.searchParams.get("p") || "default";
    const route = resolveRoute(url.pathname, persona);

    if (!route) {
      return new Response("Not Found", { status: 404 });
    }

    ctx.waitUntil(logEvent(env, {
      type: "page_visit",
      route: url.pathname,
      persona,
      ts: Date.now()
    }));

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

    // Serve HTML
    const htmlBody = await ssrRenderer.render(route.component, route.props);

    const fullHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${route.props.site?.firm_name || "MintSite"}</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      ${htmlBody}
    </body>
    </html>
  `;

    // Return fullHTML so that CSS is included
    return new Response(fullHTML, {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=120"
      }
    });

  }
};
