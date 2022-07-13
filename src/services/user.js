const bcrypt = require("bcrypt-nodejs");
const ValidationError = require("../errors/validationErrors");

module.exports = (app) => {
  const findAll = () => {
    return app.db("users").select(["id", "name", "email"]);
  };

  const findOne = (filter = {}) => {
    return app.db("users").where(filter).first();
  };

  const getPass = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError("Nome é obrigatorio");

    if (!user.email) throw new ValidationError("Email é obrigatorio");

    if (!user.password) throw new ValidationError("Senha é obrigatorio");

    const newUser = { ...user };
    newUser.password = getPass(user.password);

    const userDb = await findOne({ email: user.email });
    if (userDb) {
      throw new ValidationError("Email já cadastrado");
    }

    return app.db("users").insert(newUser, ["id", "name", "email"]);
  };
  return { findAll, save, findOne };
};
