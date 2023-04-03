import joi from "joi";

export const medicSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone: joi
    .string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .required(),
  crm: joi
    .string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
  city: joi.string().required(),
});


