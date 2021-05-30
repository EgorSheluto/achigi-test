import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { TaskNameNotExistsRule } from '../../common/decorators/task-name-not-exists.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [
    TaskNameNotExistsRule,
    TaskService,
    TaskResolver,
  ],
  exports: [TaskService],
})
export class TaskModule {}
