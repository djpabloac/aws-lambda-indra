# AWS-LAMBDA-INDRA
Aws-lambda-indra is a lambda function developed under the [Serverless](https://www.serverless.com/framework/docs) framework, the following project was built for a technical test. Requires [NodeJs](https://nodejs.org/en) version 18 or higher.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file.

`TOKEN_BEARER`

`MYSQL_HOST`

`MYSQL_PORT`

`MYSQL_USERNAME`

`MYSQL_PASSWORD`

`MYSQL_DATABASE`

`SWAPI_API`

## Getting Started

Run the following commands (Local):

```bash
# 1. Install package npm
npm i

# 2. Development (Default port: 9001)
npm run dev
```

Open [http://localhost:9001](http://localhost:9001) with your browser to see the result.

## Testing

Run the command:

```bash
npm run test
```

## Deploy

Before deploying the project you must ensure that you have [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) installed and configured in your local environment. Run the command:

```bash
npm run deploy:dev

# Or
npm run deploy:prod
```

## Authors

- [@dj.pablo.ac](https://gitlab.com/dj.pablo.ac)

## License

[MIT](https://choosealicense.com/licenses/mit/)