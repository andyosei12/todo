const Joi = require('joi');

const validateUserCreation = async (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    user_name: Joi.string().min(4).required(),
    password: Joi.string().min(8).required(),
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

module.exports = validateUserCreation;
