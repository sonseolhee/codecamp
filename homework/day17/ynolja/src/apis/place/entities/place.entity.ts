import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;
}
