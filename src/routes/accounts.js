// rotas
module.exports = (app) => {
  const create = async (req, res) => {
    await app.services.account.save(req.body).then((result) => {
      return res.status(201).json(result[0]);
    });
  };

  const findAll = (req, res) => {
    app.services.account.gfindAll().then((result) => {
      res.status(200).json(result);
    });
  };

  const findById = (req, res) => {
    app.services.account.gfindById({ id: req.params.id }).then((result) => {
      res.status(200).json(result);
    });
  };

  const update = (req, res) => {
    app.services.account.gupdate(req.params.id, req.body).then((result) => {
      res.status(201).json(result[0]);
    });
  };

  // eslint-disable-next-line object-curly-newline
  return { create, findAll, findById, update };
};
