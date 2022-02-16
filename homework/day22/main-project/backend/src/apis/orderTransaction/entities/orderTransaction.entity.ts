import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql"
import { Room } from "src/apis/room/entities/room.entity"
import { User } from "src/apis/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

export enum ORDER_TRANSACTION_STATUS_ENUM {
  // PENDING = 'PENDING',
  PAYMENT = 'PAYMENT',
  CANCLEL = 'CANCEL'
}

registerEnumType(ORDER_TRANSACTION_STATUS_ENUM, {
  name: 'ORDER_TRANSACTION_STATUS_ENUM'
})

@Entity()
@ObjectType()
export class OrderTransaction {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string

  @Column()
  @Field(() => String)
  impUid: string

  @Column()
  @Field(() => Int)
  amount: number

  @Column({ type: 'enum', enum: ORDER_TRANSACTION_STATUS_ENUM })
  @Field(() => ORDER_TRANSACTION_STATUS_ENUM)
  status: ORDER_TRANSACTION_STATUS_ENUM

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date

  @ManyToOne(() => User)
  @Field(() => User)
  user: User

  @ManyToOne(() => Room)
  @Field(() => Room)
  room: Room

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  checkOutDate: Date

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  checkInDate: Date
}