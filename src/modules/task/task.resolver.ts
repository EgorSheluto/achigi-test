import { UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [Task])
  async tasks(): Promise<Task[]> {
    return this.taskService.getAll();
  }

  @Mutation(() => Task)
  async createTasks(@Args('payload', { type: () => [CreateTaskDto]}) dtos: CreateTaskDto[]): Promise<Task[]> {
    return await this.taskService.createMany(dtos);
  }

  @Mutation(() => Task)
  async updateTasks(@Args('payload', { type: () => [UpdateTaskDto]}) dtos: UpdateTaskDto[]): Promise<void> {
    return await this.taskService.updateMany(dtos);
  }

  @Mutation(() => Task)
  async deleteTasks(@Args('payload', { type: () => [String]}) ids: string[]): Promise<void> {
    return await this.taskService.deleteMany(ids);
  }
}
