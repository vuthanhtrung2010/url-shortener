import express from "express";
import { config } from 'dotenv';
const app = express();
config()

const port = process.env.port;

import { Request } from "express";
import * as Sentry from "@sentry/node";
import bodyParser from "body-parser";
import cors from "cors";

Sentry.init({
  dsn: process.env.sentry_dsn,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

import router from "./util/router";

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(cors<Request>({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

// Connect to Database
const database = require("./util/database");
database();

app.use(express.static("public"));
app.use("/", router);

app.use(Sentry.Handlers.errorHandler());

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
