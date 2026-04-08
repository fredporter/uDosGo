/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UDOS_HOST_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
