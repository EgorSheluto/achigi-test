import { 
  Logger, 
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTasksArgs} from './args/create-tasks.args';
import { Task } from './entities/task.entity';
import { 
  CreateTaskValidationGuard, 
  DeleteTaskValidationGuard, 
  UpdateTaskValidationGuard,
} from './guards';
import { TaskService } from './task.service';
import { UpdateTasksArgs } from './args/update-tasks.args';
import { DeleteTasksArgs } from './args/delete-tasks.args';

@Resolver(() => Task)
export class TaskResolver {
  private readonly logger = new Logger(TaskResolver.name);

  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    this.logger.log('tasks has been started...');

    const tasks = await this.taskService.getAll();
    this.logger.log('tasks have been fetched');

    this.logger.log('tasks has been ended...');
    return tasks;
  }

  @Mutation(() => [Task])
  async createTasks(@Args() args: CreateTasksArgs): Promise<Task[]> {
    this.logger.log('createTasks has been started...');

    const createdTasks = await this.taskService.createMany(args?.tasks);
    this.logger.log('tasks have been created');

    this.logger.log('createTasks has been ended...');
    return createdTasks;
  }

  @Mutation(() => Boolean)
  async updateTasks(@Args() args: UpdateTasksArgs): Promise<boolean> {
    this.logger.log('updateTasks has been started...');

    const updatedTasks = await this.taskService.updateMany(args?.tasks);
    this.logger.log('tasks have been updated');

    this.logger.log('updateTasks has been ended...');
    return updatedTasks;
  }

  @Mutation(() => Boolean)
  @UseGuards(DeleteTaskValidationGuard)
  async deleteTasks(@Args() args: DeleteTasksArgs): Promise<boolean> {
    this.logger.log('deleteTasks has been started...');

    const deletedTasks = await this.taskService.deleteMany(args?.ids);
    this.logger.log('tasks have been deleted');

    this.logger.log('deleteTasks has been ended...');
    return deletedTasks;
  }
}
