module.exports = (app) => {
  const save = (account) => {
    return app.db("accounts").insert(account, "*");
  };

  const gfindAll = () => {
    return app.db("accounts");
  };

  const gfindById = async (filter = {}) => {
    return app.db("accounts").where(filter).first();
  };

  const gupdate = (id, account) => {
    return app.db("accounts").where(id).first().update(account, "*");
  };

  // eslint-disable-next-line object-curly-newline
  return { save, gfindAll, gfindById, gupdate };
};
