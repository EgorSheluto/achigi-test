import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskDto } from './dto/create-task.dto';
import { CreateTasksArgs} from './args/create-tasks.args';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { CreateTaskValidationGuard, DeleteTaskValidationGuard, UpdateTaskValidationGuard } from './guards';
import { TaskService } from './task.service';
import { UpdateTasksArgs } from './args/update-tasks.args';
import { DeleteTasksArgs } from './args/delete-tasks.args';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Mutation(() => [Task])
  @UseGuards(CreateTaskValidationGuard)
  async createTasks(@Args() args: CreateTasksArgs): Promise<Task[]> {
    return await this.taskService.createMany(args?.tasks);
  }

  @Mutation(() => Boolean)
  @UseGuards(UpdateTaskValidationGuard)
  async updateTasks(@Args() args: UpdateTasksArgs): Promise<boolean> {
    return await this.taskService.updateMany(args?.tasks);
  }

  @Mutation(() => Boolean)
  @UseGuards(DeleteTaskValidationGuard)
  async deleteTasks(@Args() args: DeleteTasksArgs): Promise<boolean> {
    return await this.taskService.deleteMany(args?.ids);
  }
}
