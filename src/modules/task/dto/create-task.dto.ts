import { 
  Field, 
  InputType,
} from '@nestjs/graphql';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { TaskNameNotExists } from '../../../common/decorators/task-name-not-exists.decorator';
import { IsDateBiggerThanNow } from '../../../common/decorators';
import { ArrayHasNotDuplicates } from '../../../common/decorators/array-has-not-duplicates.decorator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @TaskNameNotExists()
  name: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @IsDateBiggerThanNow()
  estimateDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  price?: number;

  @Field(() => [String])
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @ArrayHasNotDuplicates()
  urls: string[];

  created_at: Date;
}
