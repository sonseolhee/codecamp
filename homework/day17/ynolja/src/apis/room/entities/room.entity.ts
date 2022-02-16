import { Place } from 'src/apis/place/entities/place.entity';
import { UsageType } from 'src/apis/usagetype/entities/usagetype.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  inventory: number;

  @Column()
  basicPeopleNumber: number;

  @Column()
  maxPeopleNumber: number;

  @Column()
  price: number;

  @Column({ type: 'timestamp' })
  checkInDate: Date;

  @Column({ type: 'timestamp' })
  checkOutDate: Date;

  @ManyToOne(() => Place)
  place: Place;

  @JoinColumn()
  @OneToOne(() => UsageType)
  usageType: UsageType;
}
