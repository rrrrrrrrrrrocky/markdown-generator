import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

type BuildType = "LOCAL" | "DEV" | "STG" | "PROD";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const buildType = env.VITE_BUILD_TYPE as BuildType;

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react()],
    esbuild: {
      pure: buildType === "PROD" ? ["console.log"] : [],
    },
  };
});
