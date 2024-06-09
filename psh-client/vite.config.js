import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pluginRewriteAll from "vite-plugin-rewrite-all";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  optimizeDeps: {
    include: ["react-to-print"],
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://api.psh.com.bd",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
