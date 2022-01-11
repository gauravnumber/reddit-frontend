/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URI: string;
  readonly VITE_OFFLINE_BACKEND_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
