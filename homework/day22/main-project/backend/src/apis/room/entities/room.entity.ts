import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Place } from 'src/apis/place/entities/place.entity';
import { Usagetype } from 'src/apis/usagetype/entities/usagetype.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column({ default: 1 })
  @Field(() => Int)
  inventory: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  basicPeopleNumber: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  maxPeopleNumber: number;

  @Column()
  @Field(() => Int)
  price: number;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @ManyToOne(() => Place, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Place, { nullable: true })
  place: Place;

  @JoinColumn()
  @OneToOne(() => Usagetype)
  @Field(() => Usagetype, { nullable: true })
  usageType: Usagetype;
}
