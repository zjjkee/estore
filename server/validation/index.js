const Joi = require("joi");

// Register Validation
const signupValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
    role: Joi.string().required().valid("seller", "buyer"),
  });

  return schema.validate(data);
};

const signinValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

const productValidation = (data) => {
  const schema = Joi.object({

    title: Joi.string().min(6).max(50).required(),
    description: Joi.string().min(6).max(50).required(),
    price: Joi.number().min(10).max(9999).required(),
  });
  return schema.validate(data);
};

module.exports = {
    signupValidation : signupValidation,
    signinValidation : signinValidation,
    productValidation : productValidation,   
}
