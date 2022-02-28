import { Field, ObjectType } from '@nestjs/graphql';
import { Place } from 'src/apis/place/entities/place.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PlaceTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Place, (places) => places.placeTags)
  @Field(() => [Place])
  places: Place[];
}
