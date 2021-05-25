import { 
  BadRequestException,
  CanActivate, 
  ExecutionContext, 
  Inject, 
  Injectable 
} from '@nestjs/common';
import { 
  FAILED_UPDATE_TASK_NOTHING_TO_UPDATE, 
  FAILED_UPDATE_TASK_NOT_EXISTS,
  FAILED_UPDATE_TASK_PARAM_EXISTS,
} from '../../../constants/errors';
import { ExecutionContextHelper } from '../../../shared/exec-context/exec-context.helper';
import { UpdateTaskDto } from '../dto';
import { TaskService } from '../task.service';

@Injectable()
export class UpdateTaskValidationGuard implements CanActivate {
  constructor(
    @Inject('TaskService') private readonly taskService: TaskService
  ) {}
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const dtos = await ExecutionContextHelper
      .getArrayFromExecutionContext<UpdateTaskDto[]>(context, 'tasks');

    if (!dtos || dtos?.length <= 0) {
      return false;
    }

    for (let i = 0; i < dtos?.length; i++) {
      const { id, name, description, estimateDate, price, urls } = dtos[i];

      if (!id) {
        return true;
      }

      if (!name && 
          !description &&
          !estimateDate &&
          !price &&
          !urls
      ) {
        throw new BadRequestException(FAILED_UPDATE_TASK_NOTHING_TO_UPDATE);
      }

      let task = await this.taskService.getById(id);
      if (!task) {
        throw new BadRequestException(FAILED_UPDATE_TASK_NOT_EXISTS);
      }

      task = await this.taskService.getOne({ name });
      console.log(task?.id, id, task?.id !== id);
      if (task && task?.id !== id) {
        throw new BadRequestException(FAILED_UPDATE_TASK_PARAM_EXISTS);
      }
    }

    return true;
  }
}
