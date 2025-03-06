import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  const apiUrl = `${env.VITE_API_URL ?? "https://localhost:5000"}`;
  const PORT = `${env.VITE_API_PORT ?? 5173}`;
  return {
    plugins: [react()],
    server: {
      // host: "0.0.0.0",
      port: PORT,
      proxy: {
        "/api": {
          target: apiUrl,

          changeOrigin: true,
        },
      },
    },
  };
});
