module.exports = (schema) => async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
      next();
    } catch (err) {
      return res.status(400).json({ errors: err.errors });
    }
  };
  