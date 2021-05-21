import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enums';

@Entity()
@ObjectType()
export class Task {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  estimateDate: Date;

  @Field({ nullable: true })
  @Column({
    nullable: true,
  })
  price: number;

  @Field(() => [String])
  @Column("text", { array: true })
  urls: string[];

  @Field(() => TaskStatus)
  @Column({
    type: 'enum',
    enum: TaskStatus,
    nullable: true,
  })
  status: TaskStatus;

  @Field(() => Int, 
    { 
      nullable: true 
    }
  )
  @Column({
    nullable: true,
  })
  progress: number;
}
