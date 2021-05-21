import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async getAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.save(dto);
  }

  async createMany(dtos: CreateTaskDto[]): Promise<Task[]> {
    const tasks = dtos.map(async (dto) => await this.create(dto));

    return Promise.all(tasks);
  }

  async update(dto: UpdateTaskDto): Promise<void> {
    await this.taskRepository.update(dto.id, dto);
  }

  async updateMany(dtos: UpdateTaskDto[]): Promise<void> {
    const tasks = dtos.map(async (dto) => await this.update(dto));

    Promise.all(tasks);
  }

  async delete(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async deleteMany(ids: string[]): Promise<void> {
    const deleteTasks = ids.map(async (id) => await this.delete(id));

    Promise.all(deleteTasks);
  }
}
