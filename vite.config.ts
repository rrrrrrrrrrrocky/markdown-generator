import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    postcss: {
      config: "./postcss.config.js",
    },
    esbuild: {
      pure: env.NODE_ENV === "production" ? ["console.log"] : [],
    },
  };
});
