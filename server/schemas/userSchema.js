import Joi from '@hapi/joi';

const userSchema = Joi.object().keys({
  lastname: Joi.string().alphanum().min(3).max(30)
    .allow(null),
  firstname: Joi.string().alphanum().min(3).max(30),
  username: Joi.string().alphanum().min(3).max(15),
  birthDate: Joi.date().allow(null),
  gender: Joi.string().allow(null),
  preferredLanguage: Joi.string().alphanum().min(3).max(15)
    .allow(null),
  preferredCurrency: Joi.string().alphanum().min(3).max(30)
    .allow(null),
  location: Joi.string().min(3).max(30).allow(null),
  department: Joi.string().allow(null),
  profileImage: Joi.string().allow(null),
  emailNotifications: Joi.boolean().allow(null),
  inAppNotifications: Joi.boolean().allow(null)
});

export default userSchema;
