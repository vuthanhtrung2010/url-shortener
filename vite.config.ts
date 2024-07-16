import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import "dotenv/config"

export default defineConfig({
  server: {
    port: process.env.PORT || 3000,
  },

  plugins: [remix({
    future: {
      v3_fetcherPersist: true,
      v3_relativeSplatPath: true,
      v3_throwAbortReason: true,
    },
  }), tsconfigPaths(), sentryVitePlugin({
    org: "trung-development",
    project: "url-shortener",
    authToken: process.env.SENTRY_AUTH_TOKEN,
  })],

  build: {
    sourcemap: true
  }
});