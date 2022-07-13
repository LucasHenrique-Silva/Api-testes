/* eslint-disable nonblock-statement-body-position */

const validationErrors = require("../errors/validationErrors");

/* eslint-disable curly */
module.exports = (app) => {
  const save = (account) => {
    // eslint-disable-next-line new-cap
    if (!account.name) throw new validationErrors("Nome é obrigatorio");
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
