import { Field, Int, ObjectType } from '@nestjs/graphql';
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

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  nickName ?: string;

  @Column({nullable: true})
  @Field(() => String)
  phoneNumber ?: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @DeleteDateColumn()
  @Field(() => Date, {nullable: true})
  deletedAt?: Date;

  @Column({ default: 0 })
  @Field(() => Int, {nullable: true})
  orderTotalAmount ?: number

  // @ManyToMany(() => Coupon, (coupons) => coupons.users)
  // @Field(() => [Coupon])
  // coupons: Coupon[];

  

}
