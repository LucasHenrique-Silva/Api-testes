const ValidationError = require("../errors/validationErrors");

module.exports = (app) => {
  const findAll = (filter = {}) => {
    return app.db("users").where(filter).select();
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError("Nome é obrigatorio");

    if (!user.email) throw new ValidationError("Email é obrigatorio");

    if (!user.password) throw new ValidationError("Senha é obrigatorio");

    const userDb = await findAll({ email: user.email });
    if (userDb && userDb.length > 0) {
      throw new ValidationError("Email já cadastrado");
    }

    return app.db("users").insert(user, "*");
  };
  return { findAll, save };
};
