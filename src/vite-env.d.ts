/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CL_IMAGE_BASE_URL: stirng;
  readonly CL_REQUEST_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
