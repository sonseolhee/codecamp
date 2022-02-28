import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '../../room/entities/room.entity';

@Entity()
@ObjectType()
export class RoomImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  url: string;

  @Column()
  @Field(() => Boolean)
  isMain: boolean;

  @ManyToOne(() => Room)
  @Field(() => Room)
  room: Room;
}
