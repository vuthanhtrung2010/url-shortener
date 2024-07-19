import { createRequestHandler } from "@remix-run/express";
import express from "express";
import * as vite from "vite";
import chalk from "chalk";
import morgan from "morgan";
import path from "path";

if (!process.env.password) {
  throw new Error(chalk.red(`[@vuthanhtrung2010/url-shortener] Error: `) + "No Admin password provided.");
}

const app = express();

app.disable('x-powered-by');
app.use(morgan('tiny'));

// Setup Vite server for development
const viteDevServer = process.env.NODE_ENV === "production" ? null : await vite.createServer({
  server: { middlewareMode: true },
});

// Use Vite's middleware in development or serve static files in production
if (viteDevServer) {
  app.use(viteDevServer.middlewares);
} else {
  app.use(express.static(path.join(__dirname, "build/client")));
}

// Function to get the build module
const getBuild = async () => {
  if (viteDevServer) {
    return viteDevServer.ssrLoadModule("virtual:remix/server-build");
  } else {
    return import("./build/server/index.js");
  }
};

// Catch-all route to handle client-side routing for Remix
app.all("*", async (req, res, next) => {
  try {
    const build = await getBuild();
    //@ts-ignore
    createRequestHandler({ build })(req, res, next);
  } catch (error) {
    next(error);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
