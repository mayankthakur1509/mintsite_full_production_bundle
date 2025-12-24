// // MintSite Routing Engine
// import manifest from "../dist/manifest.json";

// export function resolveRoute(pathname, persona){
//   let p = manifest.pages.find(p=>p.route===pathname);
//   if(p) return p;

//   const lawyer = pathname.match(/^\/lawyers\/([^\/]+)$/);
//   if(lawyer){
//     return manifest.pages.find(x=>x.route.startsWith(`/lawyers/${lawyer[1]}`));
//   }

//   const v = pathname.match(/^\/lawyers\/([^\/]+)\/([^\/]+)\/vflp\/([^\/]+)$/);
//   if(v){
//     return manifest.pages.find(
//       x=>x.route===`/lawyers/${v[1]}/${v[2]}/vflp/${v[3]}`
//     );
//   }
//   return null;
// }


// engine/router.js
import manifest from "../dist/manifest.json" assert { type: "json" };

export function resolveRoute(pathname, persona = "default") {
  // Exact match routing (SSR-safe)
  const page = manifest.pages.find(p => p.route === pathname);

  if (!page) return null;

  return {
    component: page.component,
    props: page.props
  };
}
