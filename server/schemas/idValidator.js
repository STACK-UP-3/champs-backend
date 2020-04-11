import Joi from '@hapi/joi';

const idSchemas = Joi.object().keys({
  id: Joi.number().integer().required(),
});

export default idSchemas;
