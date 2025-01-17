export interface IDotEnvClient {
  NAME?: string;
  NODE_ENV?: string;
  PROTOCOL?: string;
  PORT?: number;

  BASE_HOST?: string;
  API_HOST?: string;
  GRAPHQL_ENDPOINT?: string;

  OAUTH_WECHAT_BASE_URL?: string;
  LOCALE_SUBPATHS?: string;
}

export interface IDotEnvServer extends IDotEnvClient {
  JWT_KEY?: string;
}
