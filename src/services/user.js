module.exports = (app) => {
  const findAll = () => {
    return app.db("users").select();
  };
  const save = (user) => {
    if (!user.name) {
      return { error: "Nome é obrigatorio" };
    }
    if (!user.email) {
      return { error: "Email é obrigatorio" };
    }
    if (!user.password) {
      return { error: "Senha é obrigatorio" };
    }
    return app.db("users").insert(user, "*");
  };
  return { findAll, save };
};
