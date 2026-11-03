interface IImportMetaEnv {
  readonly DB_HOST: string;
  readonly DB_PORT: string;
  readonly DB_USER: string;
  readonly DB_PASSWORD: string;
  readonly DB_NAME: string;
}

interface IImportMeta {
  readonly env: IImportMetaEnv;
}
