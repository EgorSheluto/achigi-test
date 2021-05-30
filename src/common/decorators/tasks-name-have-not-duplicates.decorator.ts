import { Inject, Injectable } from "@nestjs/common";
import { 
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface,
} from "class-validator";
import { CreateTaskDto, UpdateTaskDto } from "src/modules/task/dto";
import { FAILED_CREATE_OR_UPDATE_TASK_NAME_DUPLICATES } from "../../constants/errors";
import { TaskService } from "../../modules/task/task.service";

@ValidatorConstraint({ name: 'TasksNameHaveNotDuplicatesRule', async: true })
@Injectable()
export class TasksNameHaveNotDuplicatesRule implements ValidatorConstraintInterface {
  constructor(
    @Inject('TaskService') private readonly taskService: TaskService
  ) {}

  async validate(tasks: CreateTaskDto[] | UpdateTaskDto[]) {
    const uniqueTasks = new Set(tasks.map(task => task.name));
    return typeof tasks === 'object' && typeof uniqueTasks === 'object' && tasks?.length === uniqueTasks?.size;
  }

  defaultMessage(args: ValidationArguments) {
    return FAILED_CREATE_OR_UPDATE_TASK_NAME_DUPLICATES;
  }
}

export function TasksNameHaveNotDuplicates(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'TasksNameHaveNotDuplicates',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TasksNameHaveNotDuplicatesRule,
    });
  };
}
