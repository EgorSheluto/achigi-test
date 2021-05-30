import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { 
	ArrayMinSize, 
	ArrayNotEmpty, 
	IsArray, 
	ValidateNested 
} from "class-validator";
import { TasksNameHaveNotDuplicates } from "../../../common/decorators/tasks-name-have-not-duplicates.decorator";
import { UpdateTaskDto } from "../dto";

@ArgsType()
export class UpdateTasksArgs {
  @Field(() => [UpdateTaskDto])
	@IsArray()
	@ArrayNotEmpty()
  @ArrayMinSize(1)
	@TasksNameHaveNotDuplicates()
	@ValidateNested({ each: true })
	@Type(() => UpdateTaskDto)
	tasks: UpdateTaskDto[];
}