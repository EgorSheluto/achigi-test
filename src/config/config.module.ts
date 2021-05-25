import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MainConfigService } from './config.service';
import { PostgresqlConfigModule } from './database/postgresql';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostgresqlConfigModule,
  ],
  providers: [MainConfigService],
  exports: [MainConfigService],
})
export class MainConfigModule {}
