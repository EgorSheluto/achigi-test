import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterTaskDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getById(id: string): Promise<Task> {
    this.logger.log('getById has been started...');

    const task = await this.taskRepository
      .findOne(id)
      .catch(_ => undefined);
    this.logger.log('task has been fetched');

    this.logger.log('getById has been ended...');
    return task;
  }

  async getOne(filter?: FilterTaskDto): Promise<Task> {
    this.logger.log('getOne has been started...');

    const task = await this.taskRepository
      .findOne(filter && { ...filter });
    this.logger.log('task has been fetched');

    this.logger.log('getOne has been ended...');
    return task;
  }

  async getAll(filter?: FilterTaskDto): Promise<Task[]> {
    this.logger.log('getAll has been started...');

    const tasks = await this.taskRepository
      .find(filter && { ...filter });
    this.logger.log('tasks have been fetched');

    this.logger.log('getAll has been ended...');
    return tasks;
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    this.logger.log('create has been started...');

    const createdTask = await this.taskRepository.save(dto);
    this.logger.log('task has been created');

    this.logger.log('create has been ended...');
    return createdTask;
  }

  async createMany(dtos: CreateTaskDto[]): Promise<Task[]> {
    this.logger.log('createMany has been started...');
    const tasks = dtos.map(async (dto) => await this.create(dto));

    const createdTasks = await Promise.all(tasks);
    this.logger.log('tasks have been created');

    this.logger.log('createMany has been ended...');
    return createdTasks;
  }

  async update(dto: UpdateTaskDto): Promise<void> {
    this.logger.log('update has been started...');

    const updatedTask = this.taskRepository.update(dto.id, dto);
    this.logger.log('task has been updated');

    this.logger.log('update has been ended...');
    await updatedTask;
  }

  async updateMany(dtos: UpdateTaskDto[]): Promise<boolean> {
    this.logger.log('updateMany has been started...');

    const tasks = dtos.map(async (dto) => await this.update(dto));

    Promise.all(tasks);
    this.logger.log('tasks have been updated');

    this.logger.log('updateMany has been ended...');
    return true;
  }

  async delete(id: string): Promise<void> {
    this.logger.log('delete has been started...');

    await this.taskRepository.delete(id);
    this.logger.log('task has been deleted');

    this.logger.log('delete has been ended...');
  }

  async deleteMany(ids: string[]): Promise<boolean> {
    this.logger.log('deleteMany has been started...');

    const deletedTasks = ids.map(async (id) => await this.delete(id));

    Promise.all(deletedTasks);
    this.logger.log('tasks have been deleted');

    this.logger.log('deleteMany has been ended...');
    return true;
  }
}
