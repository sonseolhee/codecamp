import { Field, ObjectType } from '@nestjs/graphql';
import { PlaceTag } from 'src/apis/placeTag/entities/placeTag.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Place {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  address: string;

  @ManyToMany(() => PlaceTag, (placeTags) => placeTags.places)
  @Field(() => [PlaceTag])
  placeTags: PlaceTag[];
}
