import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/course-club",
  server: {
    port: 8899, // 修改为你想要的端口号
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/hostize": {
        target: "https://api.hostize.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hostize/, ""),
      },
    },
  },
});
