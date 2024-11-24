import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pluginRewriteAll from "vite-plugin-rewrite-all";

export default defineConfig({
  plugins: [
    react(), // React plugin with SWC for faster builds
    pluginRewriteAll(), // Rewrite plugin to handle routing issues
  ],
  optimizeDeps: {
    include: [
      "react-to-print", // Pre-bundling specific dependencies
      "@splidejs/splide/dist/css/themes/splide-default.min.css", // Include Splide CSS
    ],
  },
  build: {
    rollupOptions: {
      // Explicitly externalize Splide's CSS if needed
      external: ["@splidejs/splide/dist/css/themes/splide-default.min.css"],
    },
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import pluginRewriteAll from "vite-plugin-rewrite-all";

// export default defineConfig({
//   plugins: [
//     react(), // Use the React plugin with SWC for faster builds
//     pluginRewriteAll(), // Use the rewrite plugin if needed for URL rewriting
//   ],
//   optimizeDeps: {
//     include: ["react-to-print"], // Ensure this dependency is pre-bundled
//   },

//   // server: {
//   //   proxy: {
//   //     "/api": {
//   //       target: "https://api.psh.com.bd", // Target API URL
//   //       changeOrigin: true, // Modify the `Origin` header to the target URL
//   //       rewrite: (path) => path.replace(/^\/api/, "/api"), // Remove `/api` prefix before forwarding
//   //     },
//   //   },
//   // },
// });
