/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
const bcrypt = require("bcrypt-nodejs");
const ValidationError = require("../errors/validationErrors");

module.exports = (app) => {
  const findAll = () => {
    return app.db("users").select(["id", "name", "email"]);
  };

  const findOne = (filter = {}) => {
    return app.db("users").where(filter).first();
  };

  const getpasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (user) => {
    if (!user.name) throw new ValidationError("Nome é um atributo obrigatório");
    if (!user.email)
      throw new ValidationError("Eemail é um atributo obrigatório");
    if (!user.password)
      throw new ValidationError("Senha é um atributo obrigatório");

    const userDb = await findOne({ email: user.email });
    if (userDb)
      throw new ValidationError("Já existe um usuário com esse email");

    const newUser = { ...user };
    newUser.password = getpasswordHash(user.password);
    return app.db("users").insert(newUser, ["id", "name", "email"]);
  };

  return { findAll, save, findOne };
};
