import { defineConfig, loadEnv } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const envObj: Record<string, string> = {};
  envObj["VUE_APP_APPLICATION"] = env.VUE_APP_APPLICATION;
  envObj["VUE_APP_BAUTH"] = env.VUE_APP_BAUTH;
  envObj["VUE_APP_API_URL_BAUTH"] = env.VUE_APP_API_URL_BAUTH;
  envObj["VUE_APP_SECRET_CRYPTO"] = env.VUE_APP_SECRET_CRYPTO;
  envObj["VUE_APP_IV_CRYPTO"] = env.VUE_APP_IV_CRYPTO;
  envObj["VUE_APP_API_URL"] = env.VUE_APP_API_URL;
  envObj["VUE_APP_API_URL_WS"] = env.VUE_APP_API_URL_WS;
  envObj["VUE_APP_SECRET"] = env.VUE_APP_SECRET;
  return {
    plugins: [vue()],
    resolve: {
      alias: { "@": path.resolve(__dirname, "./src") },
    },
    define: {
      "process.env": envObj,
    },
    server: {
      port: 8080,
    },
  };
});
