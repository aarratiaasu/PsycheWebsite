import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { viteStaticCopy } from "vite-plugin-static-copy"; 

export default defineConfig({
    publicDir: false, // Disable Vite's default public dir handling
    plugins: [
        wasm(),
        topLevelAwait(),
        viteStaticCopy({
            targets: [
                // Files
                { src: ".gitignore", dest: "" },
                { src: "index.html", dest: "" }, // Note: Vite will likely overwrite this with its processed version
                { src: "package-lock.json", dest: "" },
                { src: "package.json", dest: "" },
                { src: "README.md", dest: "" },
                { src: "structure.txt", dest: "" },
                { src: "vite.config.mjs", dest: "" },
                // Folders (excluding 'dist' and 'public')
                { src: ".git", dest: "" },
                { src: ".github", dest: "" },
                { src: "assets", dest: "" }, // Note: Vite also processes assets into dist/assets
                { src: "balance", dest: "" },
                { src: "css", dest: "" },
                { src: "escapeVelocity", dest: "" },
                { src: "games", dest: "" },
                { src: "img", dest: "" },
                { src: "name", dest: "" },
                { src: "node_modules", dest: "" }, // Warning: This will significantly increase dist size
                { src: "PsycheJR", dest: "" },
                { src: "psycheName", dest: "" },
                { src: "res", dest: "" },
                { src: "spacepic", dest: "" },
                { src: "src", dest: "" }, // Note: Vite processes src separately; this copies the raw source
                { src: "TEST_IFRAME_SECTION7", dest: "" },
                { src: "website", dest: "" },
                { src: "year", dest: "" },
                { src: "public", dest: "" } // Explicitly copy the public folder
            ],
            // Optional: Add options like `overwrite: true` if needed, default is true
        })
    ],
    optimizeDeps: {
        include: ["three"]
    },
    build: {
        assetsDir: "assets",
        outDir: "dist"  // Changed back to "dist" to avoid conflicts
    }
});
