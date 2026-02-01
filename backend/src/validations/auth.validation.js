const Joi = require("joi");

const register = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
};
