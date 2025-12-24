import esbuild from "esbuild";

esbuild.build({
    entryPoints: ["src/renderer/client.js"],
    bundle: true,
    outfile: "dist/client.js",
    format: "esm",
    platform: "browser",
    sourcemap: true,

    // 👇 THIS IS THE FIX
    loader: {
        ".js": "jsx"
    }
}).then(() => {
    console.log("✅ client.js built");
}).catch(() => process.exit(1));
