/* eslint-disable nonblock-statement-body-position */
/* eslint-disable curly */
module.exports = (app) => {
  const save = (account) => {
    if (!account.name) return { error: "Nome é obrigatorio" };
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

  const gremove = (id) => {
    return app.db("accounts").where({ id }).del();
  };

  // eslint-disable-next-line object-curly-newline
  return { save, gfindAll, gfindById, gupdate, gremove };
};
