import { ArgsType, Field } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { 
	ArrayMinSize, 
	ArrayNotEmpty, 
	IsArray, 
	IsUUID, 
} from "class-validator";
import { ArrayHasNotDuplicates } from "../../../common/decorators/array-has-not-duplicates.decorator";

@ArgsType()
export class DeleteTasksArgs {
  @Field(() => [String])
	@IsArray()
	@ArrayNotEmpty()
  @ArrayMinSize(1)
	@IsUUID('all', { each: true })
	@ArrayHasNotDuplicates()
	@Type(() => String)
	ids: string[];
}
