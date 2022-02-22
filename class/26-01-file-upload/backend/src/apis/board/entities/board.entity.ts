import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType() //graphql
export class Board {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: String;

  @Column()
  @Field(() => String)
  title: String;

  @Column()
  @Field(() => String)
  contents: String;
}
