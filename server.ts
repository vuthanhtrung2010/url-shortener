import { createRequestHandler } from "@remix-run/express";
import express from "express";
import * as vite from "vite";
import "./instrumentation.server.mjs";
import chalk from "chalk";
import morgan from "morgan";

if (!process.env.password) throw new Error(chalk.red(`[@vuthanhtrung2010/url-shortener] Error: `) + "No Admin password provided.");

const viteDevServer =
    process.env.NODE_ENV === "production"
        ? null
        : await vite.createServer({
            server: { middlewareMode: true },
        })

const app = express();

app.disable('x-powered-by');

app.use(morgan('tiny'))
app.use(
    viteDevServer
        ? viteDevServer.middlewares
        : express.static("build/client")
);

const build = viteDevServer
    ? () =>
        viteDevServer.ssrLoadModule(
            "virtual:remix/server-build"
        )
    //@ts-ignore
    : await import("./build/server/index.js");

    //@ts-ignore
app.all("*", createRequestHandler({ build }));

const port = process.env.PORT || 3000;
app.listen(port, async () => {
    console.log(`App listening on http://localhost:${port}`);
});
