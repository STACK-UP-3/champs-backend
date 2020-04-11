import Joi from '@hapi/joi';

const schemas = Joi.object().keys({
  departure: Joi.number().integer().required(),
  destination: Joi.number().integer().required(),
  reasons: Joi.string().required(),
  date: Joi.date().iso().required(),
  returnDate: Joi.date().iso(),
});

export default schemas;
