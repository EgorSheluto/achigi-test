import * as Joi from 'joi';

export default () => Joi.object({
  DB_TYPE: Joi.string(),
	DB_HOST: Joi.string(),
	DB_PORT: Joi.number(),
	DB_USERNAME: Joi.string(),
	DB_PASSWORD: Joi.string(),
	DB_DATABASE: Joi.string(),
	DB_ENTITIES: Joi.string(),
	DB_SYNCHRONIZE: Joi.boolean(),
	DB_LOGGING_BOOLEAN: Joi.boolean(),
	DB_LOGGING_ARRAY: Joi.array(),
});
