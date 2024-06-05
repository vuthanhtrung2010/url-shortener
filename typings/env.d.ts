declare global {
  namespace NodeJS {
    interface ProcessEnv {
      database: string;
      password: string;
      sentry_dsn: string;
    }
  }
}

export {};
