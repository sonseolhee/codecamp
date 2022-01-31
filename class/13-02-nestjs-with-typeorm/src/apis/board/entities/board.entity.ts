import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  number: number;

  @Column()
  writer: String;

  @Column()
  title: String;

  @Column()
  contents: String;
}
