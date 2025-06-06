interface ImportMetaEnv {
  readonly SHEETS_API_KEY: string;
  readonly SPREADSHEET_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
