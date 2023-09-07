declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_BEARER: string;
      MYSQL_HOST: string;
      MYSQL_PORT: string;
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
      SWAPI_API: string;
    }
  }
}

export { }