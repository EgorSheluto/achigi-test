import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { ArrayHasNotDuplicates } from '../../../common/decorators/array-has-not-duplicates.decorator';

@InputType()
export class UpdateTaskDto {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  @MinLength(1)
  estimateDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  price?: number;

  @Field(() => [String], {
    nullable: true
  })
  @IsOptional()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayHasNotDuplicates()
  urls?: string[];

  updated_at: Date;
}
