declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE_URL: string;
        password: string;
        PORT: string
      }
    }
  }
  
  export {};
  