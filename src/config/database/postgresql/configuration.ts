import { registerAs } from "@nestjs/config";

export default registerAs('postgresql', () => ({
  type: process.env.DB_TYPE,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: process.env.DB_ENTITIES,
	synchronize: process.env.DB_SYNCHRONIZE,
	loggingBoolean: process.env.DB_LOGGING_BOOLEAN,
	loggingArray: process.env.DB_LOGGING_ARRAY,
}));