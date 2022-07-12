module.exports = (app) => {
  app.route("/users").get(app.routes.users.findAll);
  app.route("/users").post(app.routes.users.create);

  app.route("/account").post(app.routes.accounts.create);
};
