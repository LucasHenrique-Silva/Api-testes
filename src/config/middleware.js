/* eslint-disable import/no-extraneous-dependencies */
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = (app) => {
  app.use(bodyParser.json());

  app.use(cors({ origin: "*" }));
};
