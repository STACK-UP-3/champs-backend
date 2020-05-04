import Joi from '@hapi/joi';


const accommodationSchema = Joi.object().keys({
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  locationId: Joi.number().required(),
  amenities: Joi.string().required().trim(),
  images: Joi.array().items(Joi.string())
    .required()
    .messages({
      'array.base': 'images must be an array',
      'any.required': 'images are required'
    }),
  rooms: Joi.array().items(Joi.object({
    roomType: Joi.string().min(3).required().trim(),
    numberOfRooms: Joi.number().required(),
    roomAmenities: Joi.string().min(1).required().trim(),
    roomImages: Joi.array().items(Joi.string()),
    cost: Joi.number().required()
  }))
    .required()
    .messages({
      'array.base': 'Rooms must be an array',
      'any.required': 'Rooms are required'
    }),
});

export default accommodationSchema;
