import { timestamp } from 'rxjs';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  contents: string;

  @Column()
  discount_amount: number;

  @Column()
  condition: number;

  @Column()
  status: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @JoinTable()
  @ManyToMany(() => User, (users) => users.coupons)
  users: User[];
}
