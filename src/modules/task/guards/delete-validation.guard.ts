import { 
  BadRequestException, 
  CanActivate, 
  ExecutionContext, 
  Inject, 
  Injectable,
} from '@nestjs/common';
import { FAILED_DELETE_TASK_NOT_EXISTS } from '../../../constants/errors';
import { ExecutionContextHelper } from '../../../shared/exec-context/exec-context.helper';
import { TaskService } from '../task.service';

@Injectable()
export class DeleteTaskValidationGuard implements CanActivate {
  constructor(
    @Inject('TaskService') private readonly taskService: TaskService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const dtos = await ExecutionContextHelper
      .getArrayFromExecutionContext<string[]>(context, 'ids');

    if (!dtos || dtos?.length <= 0) {
      return false;
    }

    for (let i = 0; i < dtos?.length; i++) {
      const id = dtos[i];

      if (!id) {
        return true;
      }

      const task = await this.taskService.getById(id);
      console.log(id, task);
      if (!task) {
        throw new BadRequestException(FAILED_DELETE_TASK_NOT_EXISTS);
      }
    }

    return true;
  }
}
