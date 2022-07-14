module.exports = {
  test: {
    client: "pg",
    version: "9.6",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "docker",
      database: "barriga",
    },
    migrations: { directory: "src/migration" },
    seeds: { directory: "src/seeds" },
  },
  prod: {
    client: "pg",
    version: "9.6",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "docker",
      database: "srbarriga",
    },
    migrations: { directory: "src/migration" },
  },
};
