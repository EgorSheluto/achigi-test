import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { TasksNameHaveNotDuplicates } from "../../../common/decorators/tasks-name-have-not-duplicates.decorator";
import { CreateTaskDto } from "../dto/create-task.dto";

@ArgsType()
export class CreateTasksArgs {
  @Field(() => [CreateTaskDto])
	@IsArray()
	@ArrayNotEmpty()
  @ArrayMinSize(1)
	@TasksNameHaveNotDuplicates()
	@ValidateNested({ each: true })
	@Type(() => CreateTaskDto)
	tasks: CreateTaskDto[];
}