import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainConfigModule } from './config';
import { MainConfigService } from './config/config.service';
import { TaskModule } from './modules/task/task.module';
import * as depthLimit from 'graphql-depth-limit';
// import { MorganModule, MorganInterceptor } from 'nest-morgan';
// import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [MainConfigModule],
      useFactory: (configService: MainConfigService) => ({
        type: 'postgres',
        host: configService.host,
        port: configService.port,
        username: configService.username,
        password: configService.password,
        database: configService.database,
        entities: [configService.entities],
        synchronize: configService.synchronize,
        logging: true, // configService.loggingBoolean/* || configService.loggingArray*/,
      }),
      inject: [MainConfigService]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      debug: false,
      introspection: true,
      validationRules: [
				depthLimit(
					3,
					{ ignore: [/_trusted$/, 'idontcare'] },
					depths => {
						if (depths[''] === 3 - 1) {
							Logger.warn(
								`⚠️  You can only descend 3 levels.`,
								'GraphQL',
								false
							)
						}
					}
				)
			],
      formatError: error => {
        Logger.error(
          error.extensions?.exception?.response?.message,
          null,
          'GraphQL', 
          false
        );

        return {
          message: error.message,
          statusCode: error.extensions?.exception?.response?.statusCode || 
            error.extensions && error.extensions.code,
          errors: error.extensions?.exception?.response?.message,
					path: error.path
        }
      }
    }),
    TaskModule,
    // MorganModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: MorganInterceptor('tiny'),
    // }
  ],
})
export class AppModule {}
