import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  contents?: string;

  @Column()
  @Field(() => Int)
  discount_amount: number;

  @Column()
  @Field(() => String)
  condition?: string;

  @Column()
  @Field(() => String)
  status: string;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  startDate: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  expireDate: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  updatedAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  // @JoinTable()
  // @ManyToMany(() => User, (users) => users.coupons)
  // @Field(() => [User])
  // users: User[];
}
