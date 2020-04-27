import Joi from '@hapi/joi';

const schemas = Joi.object().keys({
  departure: Joi.number().integer().required(),
  destination: Joi.array().items(Joi.number().integer()),
  reasons: Joi.string().required(),
  date: Joi.date().iso().required(),
  returnDate: Joi.date().iso(),
  accommodationId: Joi.number().integer().required(),
});

export default schemas;
