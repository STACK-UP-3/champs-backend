import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  lastname: Joi.string().alphanum().min(3).max(30),
  firstname: Joi.string().alphanum().min(3).max(30),
  username: Joi.string().alphanum().min(3).max(15),
  gender: Joi.string().alphanum().min(3).max(30),
  birthDate: Joi.date(),
  preferredLanguage: Joi.string().alphanum().min(3).max(15),
  preferredCurrency: Joi.string().alphanum().min(3).max(30),
  location: Joi.string().min(3).max(30),
  department: Joi.string(),
  emailNotifications: Joi.boolean(),
  inAppNotifications: Joi.boolean()
});
export default userSchema;
