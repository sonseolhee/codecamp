import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Usagetype {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  startTime: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  endTime: Date;
}
