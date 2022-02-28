import { InputType, OmitType } from '@nestjs/graphql';
import { Usagetype } from '../entities/usagetype.entity';

@InputType()
export class UsagetypeInput extends OmitType(Usagetype, ['id'], InputType) {}
