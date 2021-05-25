import { 
  BadRequestException, 
  CanActivate, 
  ExecutionContext, 
  Inject, 
  Injectable,
} from '@nestjs/common';
import { FAILED_CREATE_TASK_NAME_EXISTS } from '../../../constants/errors';
import { ExecutionContextHelper } from '../../../shared/exec-context/exec-context.helper';
import { CreateTaskDto } from '../dto';
import { TaskService } from '../task.service';

@Injectable()
export class CreateTaskValidationGuard implements CanActivate {
  constructor(
    @Inject('TaskService') private readonly taskService: TaskService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const dtos = await ExecutionContextHelper
      .getArrayFromExecutionContext<CreateTaskDto[]>(context, 'tasks');

    if (!dtos || dtos?.length <= 0) {
      return false;
    }

    for (let i = 0; i < dtos?.length; i++) {
      const { name, description } = dtos[i];

      if (!name || !description) {
        return true;
      }

      const task = await this.taskService.getOne({ name });
      if (task) {
        throw new BadRequestException(FAILED_CREATE_TASK_NAME_EXISTS);
      }
    }

    return true;
  }
}
