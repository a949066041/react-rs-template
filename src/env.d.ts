/// <reference types="@rsbuild/core/types" />

declare const APP_TITLE: string
declare const APP_VERSION: string

interface ImportMetaEnv {
  readonly PUBLIC_CONSOLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
