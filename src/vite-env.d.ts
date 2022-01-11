/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BACKEND_URI: string;
  readonly HI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
