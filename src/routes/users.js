/* eslint-disable consistent-return */
module.exports = (app) => {
  const findAll = (req, res) => {
    app.services.user.findAll().then((result) => res.status(200).json(result));
  };

  const findOne = (req, res) => {
    app.services.user
      .findOne({ id: req.params.id })
      .then((result) => res.status(200).json(result));
  };

  const create = async (req, res) => {
    try {
      const result = await app.services.user.save(req.body);

      res.status(201).json(result[0]);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  return { findAll, create, findOne };
};
