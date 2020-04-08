import Joi from '@hapi/joi';

const joiMessage = (error) => {
  const { details } = error;
  const message = details.map((i) => i.message.replace(/"/g, '')).join(', ');
  return message;
};

const pagenationValidator = (req, res, next) => {
  const Schema = Joi.object().keys({
    limit: Joi.number().integer().min(1),
    page: Joi.number().integer().min(1),
  });
  const result = Schema.validate({ limit: req.query.limit, page: req.query.page }, {
    abortEarly: false
  });
  const valid = result.error == null;
  if (valid) {
    return next();
  }
  return res.status(400).json({ status: 400, error: joiMessage(result.error) });
};

export default pagenationValidator;
