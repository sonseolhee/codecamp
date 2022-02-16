import { InputType, OmitType } from '@nestjs/graphql';
import { Place } from '../entities/place.entity';

@InputType()
export class CreatePlaceInput extends OmitType(Place, ['id'], InputType) {}
