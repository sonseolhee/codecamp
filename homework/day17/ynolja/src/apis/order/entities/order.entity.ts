import { Room } from 'src/apis/room/entities/room.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  price: number;

  @Column({ type: 'timestamp' })
  orderDate: Date;

  @Column({ type: 'timestamp' })
  checkInDate: Date;

  @Column({ type: 'timestamp' })
  checkOutDate: Date;

  @Column({ type: 'timestamp' })
  status: string;

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => User)
  user: User;
}
