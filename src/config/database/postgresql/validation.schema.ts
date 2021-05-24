import * as Joi from 'joi';

export default () => Joi.object({
  DB_TYPE: Joi.string().default('postgres'),
	DB_HOST: Joi.string().default('localhost'),
	DB_PORT: Joi.number().default(5432),
	DB_USERNAME: Joi.string().default('root'),
	DB_PASSWORD: Joi.string().default('root'),
	DB_DATABASE: Joi.string().default('achicgi'),
	DB_ENTITIES: Joi.string().default('dist/**/*.entity{.ts,.js}'),
	DB_SYNCHRONIZE: Joi.boolean().default(false),
});
