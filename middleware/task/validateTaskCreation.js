const Joi = require('joi');

const validateTaskCreation = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (err) {
    return res.status(422).json({
      message: err.message,
    });
  }
};

module.exports = validateTaskCreation;
