import Joi from '@hapi/joi';

const placeSchemas = Joi.object().keys({
  name: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
});

export default placeSchemas;
