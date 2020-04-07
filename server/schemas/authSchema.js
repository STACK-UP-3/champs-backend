/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const signupSchema = Joi.object().keys({
  lastname: Joi.string().alphanum().min(3).max(30)
    .required(),
  firstname: Joi.string().alphanum().min(3).max(30)
    .required(),
  email: Joi.string().email().max(30).required(),
  password: Joi.string().alphanum().min(6).max(30)
    .required()
});
