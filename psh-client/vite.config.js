import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  optimizeDeps: {
    include: ["react-to-print"],
  },
  // build: {
  //   rollupOptions: {
  //     external: ['sweetalert2'],
  //   },
  // },

  // server: {
  //   proxy: {
  //     "/foo": "http://localhost:4567",

  //     "^/fallback/.*": {
  //       target: "https://api.psh.com.bd",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/fallback/, ""),
  //     },
  //     // Using the proxy instance
  //     "/api": {
  //       target: "https://api.psh.com.bd",
  //       changeOrigin: true,
  //       configure: (proxy, options) => {
  //         // proxy will be an instance of 'http-proxy'
  //       },
  //     },

  //     "/socket.io": {
  //       target: "ws://localhost:5174",
  //       ws: true,
  //     },
  //   },
  // },
});
