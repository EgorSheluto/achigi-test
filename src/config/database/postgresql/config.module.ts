import { Module } from '@nestjs/common';
import { 
  ConfigModule, 
  ConfigService 
} from '@nestjs/config';
import configuration from './configuration';
import validationSchema from './validation.schema';

@Module({
  imports: [
		ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV.trim() === 'development' && '.development.env' ||
				process.env.NODE_ENV.trim() === 'test' && '.test.env',
      load: [configuration],
      validationSchema: validationSchema(),
      expandVariables: true,
    })
	],
  providers: [ConfigService,],
  exports: [ConfigService,],

})
export class PostgresqlConfigModule {}
