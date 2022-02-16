import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsageType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;
}
