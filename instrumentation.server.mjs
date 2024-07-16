import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "https://e6e13b4e8ed78464ea377a9ea9e58d59@o4507611654717440.ingest.de.sentry.io/4507611659370576",
    tracesSampleRate: 1,
    autoInstrumentRemix: true
})