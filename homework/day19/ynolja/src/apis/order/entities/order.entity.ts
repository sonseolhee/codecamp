import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/apis/room/entities/room.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  orderDate: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  checkInDate: Date;

  @Column({ type: 'timestamp' })
  @Field(() => Date)
  checkOutDate: Date;

  @Column()
  @Field(() => String)
  status: string;

  @ManyToOne(() => Room)
  @Field(() => Room)
  room: Room;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
