/* eslint-disable import/prefer-default-export */
import Joi from '@hapi/joi';

export const userSchema = Joi.object().keys({
  lastname: Joi.string().alphanum().min(3).max(30)
    .required(),
  firstname: Joi.string().alphanum().min(3).max(30)
    .required(),
  gender: Joi.string().alphanum().min(3).max(30)
    .required(),
  birthdate: Joi.date().required(),
  preferredlanguage: Joi.string().alphanum().min(3).max(15)
    .required(),
  preferredcurrency: Joi.string().alphanum().min(3).max(30)
    .required(),
  location: Joi.string().min(3).max(30)
    .required(),
  Department: Joi.string().alphanum()
    .required(),
  emailNotifications: Joi.boolean().required(),
  inAppNotifications: Joi.boolean().required()
});
