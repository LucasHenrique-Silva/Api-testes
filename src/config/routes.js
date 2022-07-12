module.exports = (app) => {
  app.route("/users").get(app.routes.users.findAll);
  app.route("/users").post(app.routes.users.create);
};
