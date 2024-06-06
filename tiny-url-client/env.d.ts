/// <reference types="vite/client" />
declare namespace NodeJS {
  interface ProcessEnv {
    VITE_APP_API_URL: string
    VITE_APP_BASE_URL: string
  }
}
