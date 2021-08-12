require("dotenv").config();

module.exports = {
  development: {
    client: "postgres",
    connection: process.env.DATABASE_URL || {
      user: "abreham_g",
      host: "localhost",
      password: "mynameis12@P",
      database: "faceir",
      port: 5432, //for local db connection
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: "js",
      tableName: "knex_migrations",
    },
  },
  staging: process.env.DATABASE_URL || {},
  production: process.env.DATABASE_URL || {},
};
