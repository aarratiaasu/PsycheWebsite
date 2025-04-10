import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { viteStaticCopy } from "vite-plugin-static-copy"; 

export default defineConfig({
    base: '/PsycheWebsite/', // Base path for GitHub Pages
    publicDir: 'public', // Enable Vite's public dir handling
    plugins: [
        wasm(),
        topLevelAwait(),
        viteStaticCopy({
            targets: [
                // Files
                { src: ".gitignore", dest: "" },
                { src: "index.html", dest: "" },
                { src: "package-lock.json", dest: "" },
                { src: "package.json", dest: "" },
                { src: "README.md", dest: "" },
                { src: "structure.txt", dest: "" },
                { src: "vite.config.mjs", dest: "" },
                
                // Main folders - simplified approach
                { src: "assets", dest: "" },
                { src: "balance", dest: "" },
                { src: "css", dest: "" },
                { src: "escapeVelocity", dest: "" },
                { src: "games", dest: "" },
                { src: "img", dest: "" },
                { src: "name", dest: "" },
                { src: "PsycheJR", dest: "" },
                { src: "psycheName", dest: "" },
                { src: "res", dest: "" },
                { src: "spacepic", dest: "" },
                { src: "src", dest: "" },
                { src: "TEST_IFRAME_SECTION7", dest: "" },
                { src: "website", dest: "" },
                { src: "year", dest: "" }
            ],
            flatten: false
        })
    ],
    optimizeDeps: {
        include: ["three"]
    },
    build: {
        assetsDir: "assets",
        outDir: "dist",
        chunkSizeWarningLimit: 1000, // Increase chunk size warning limit to 1000 KB
        rollupOptions: {
            output: {
                manualChunks: {
                    three: ['three'],
                    vendor: ['gsap']
                }
            }
        }
    }
});
