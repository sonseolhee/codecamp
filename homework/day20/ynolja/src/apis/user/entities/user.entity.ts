import { Field, ObjectType } from '@nestjs/graphql';
import { Coupon } from 'src/apis/coupon/entities/coupon.entity';
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
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  nickName: string;

  @Column()
  @Field(() => String)
  phoneNumber: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @DeleteDateColumn()
  @Field(() => Date)
  deletedAt: Date;

  // @ManyToMany(() => Coupon, (coupons) => coupons.users)
  // @Field(() => [Coupon])
  // coupons: Coupon[];
}
