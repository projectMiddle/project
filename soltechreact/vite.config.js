import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    historyApiFallback: true,
    proxy: {
      "/pay": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/employee": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/attendance": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/empinfo": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
