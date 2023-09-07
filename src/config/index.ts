export const config = {
  auth: {
    tokenBearer: process.env.TOKEN_BEARER!
  },
  db: {
    mysql: {
      host: process.env.MYSQL_HOST!,
      port: parseInt(process.env.MYSQL_PORT!),
      username: process.env.MYSQL_USERNAME!,
      password: process.env.MYSQL_PASSWORD!,
      database: process.env.MYSQL_DATABASE!
    }
  },
  apiExternal: {
    swapApi: process.env.SWAPI_API!
  }
}