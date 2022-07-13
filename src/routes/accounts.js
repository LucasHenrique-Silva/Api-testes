// rotas
module.exports = (app) => {
  const create = async (req, res) => {
    const result = await app.services.account.save(req.body);
    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result[0]);
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

  const remove = (req, res) => {
    app.services.account.gremove(req.params.id).then(() => {
      res.status(204).send();
    });
  };

  // eslint-disable-next-line object-curly-newline
  return { create, findAll, findById, update, remove };
};
