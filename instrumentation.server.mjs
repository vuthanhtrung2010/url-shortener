import * as Sentry from "@sentry/remix";
import "dotenv/config";

Sentry.init({
    dsn: process.env.SENTRY_DSN_ADDRESS,
    tracesSampleRate: 1,
    autoInstrumentRemix: true
})