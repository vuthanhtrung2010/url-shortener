declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      password: string;
      PORT?: number;
    }
  }
}

export {};
