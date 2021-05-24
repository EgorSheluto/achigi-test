import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterTaskDto } from './dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getById(id: string): Promise<Task> {
    console.log(id);
    return await this.taskRepository
      .findOne(id)
      .catch(_ => undefined);
  }

  async getOne(filter?: FilterTaskDto): Promise<Task> {
    return await this.taskRepository
      .findOne(filter && { ...filter });
  }

  async getAll(filter?: FilterTaskDto): Promise<Task[]> {
    return await this.taskRepository
      .find(filter && { ...filter });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(dto);
  }

  async createMany(dtos: CreateTaskDto[]): Promise<Task[]> {
    const tasks = dtos.map(async (dto) => await this.create(dto));

    return await Promise.all(tasks);
  }

  async update(dto: UpdateTaskDto): Promise<void> {
    await this.taskRepository.update(dto.id, dto);
  }

  async updateMany(dtos: UpdateTaskDto[]): Promise<boolean> {
    const tasks = dtos.map(async (dto) => await this.update(dto));

    Promise.all(tasks);

    return true;
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async deleteMany(ids: string[]): Promise<boolean> {
    const deleteTasks = ids.map(async (id) => await this.delete(id));

    Promise.all(deleteTasks);

    return true;
  }
}
