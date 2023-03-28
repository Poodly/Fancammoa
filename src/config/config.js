require("dotenv").config();
const env = process.env;

const development = {
  username: env.MYSQL_AWS_USERNAME,
  password: env.MYSQL_AWS_PASSWORD,
  database: env.MYSQL_AWS_DATABASE,
  host: env.MYSQL_AWS_HOST,
  dialect: "mysql",
};
const test = {
  username: env.MYSQL_AWS_USERNAME,
  password: env.MYSQL_AWS_PASSWORD,
  database: env.MYSQL_AWS_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: env.MYSQL_AWS_USERNAME,
  password: env.MYSQL_AWS_PASSWORD,
  database: env.MYSQL_AWS_DATABASE,
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, test, production };