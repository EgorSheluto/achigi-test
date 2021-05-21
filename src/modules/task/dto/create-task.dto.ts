import { Field, InputType } from '@nestjs/graphql';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateTaskDto {
  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @Field()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  description: string;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  @MinLength(1)
  estimateDate?: Date;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  price?: number;

  @Field(() => [String])
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  urls: string[];
}
