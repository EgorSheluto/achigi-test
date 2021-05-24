import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { CreateTaskDto } from "../dto/create-task.dto";

@ArgsType()
export class CreateTasksArgs {
  @Field(() => [CreateTaskDto])
	@IsArray()
	@ArrayNotEmpty()
  @ArrayMinSize(1)
	@ValidateNested({ each: true })
	@Type(() => CreateTaskDto)
	tasks: CreateTaskDto[];
}