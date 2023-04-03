import joi from "joi";

export const patientSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone: joi
    .string()
    .length(9)
    .pattern(/^[0-9]+$/)
    .required(),
});
