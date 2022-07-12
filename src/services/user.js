module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db("users").where(filter).select();
  };

  const save = async (user) => {
    if (!user.name) return { error: "Nome é obrigatorio" };

    if (!user.email) return { error: "Email é obrigatorio" };

    if (!user.password) return { error: "Senha é obrigatorio" };

    const userDb = await findAll({ email: user.email });
    if (userDb && userDb.length > 0) return { error: "Email já cadastrado" };

    return app.db("users").insert(user, "*");
  };
  return { findAll, save };
};
