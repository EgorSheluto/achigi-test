import { Inject, Injectable } from "@nestjs/common";
import { 
  registerDecorator, 
  ValidationArguments, 
  ValidationOptions, 
  ValidatorConstraint, 
  ValidatorConstraintInterface,
} from "class-validator";
import { FAILED_CREATE_TASK_NAME_EXISTS } from "../../constants/errors";
import { TaskService } from "../../modules/task/task.service";

@ValidatorConstraint({ name: 'TaskNameNotExists', async: true })
@Injectable()
export class TaskNameNotExistsRule implements ValidatorConstraintInterface {
  constructor(
    @Inject('TaskService') private readonly taskService: TaskService
  ) {}

  async validate(name: string) {
    const task = await this.taskService.getOne({ name });
    if (task) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} ${FAILED_CREATE_TASK_NAME_EXISTS}`;
  }
}

export function TaskNameNotExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'TaskNameNotExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: TaskNameNotExistsRule,
    });
  };
}
