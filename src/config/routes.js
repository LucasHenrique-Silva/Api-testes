module.exports = (app) => {
  app
    .route("/users")
    .get(app.routes.users.findAll)
    .post(app.routes.users.create);

  app.route("/account").post(app.routes.accounts.create);
  app.route("/account").get(app.routes.accounts.findAll);

  app.route("/account/:id").get(app.routes.accounts.findById);
  app.route("/account/:id").put(app.routes.accounts.update);
  app.route("/account/:id").delete(app.routes.accounts.remove);
};
