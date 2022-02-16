import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usagetype } from './entities/usagetype.entity';
import { UsagetypeResolver } from './usagetype.resolver';
import { UsagetypeService } from './usagetype.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usagetype])],
  providers: [
    UsagetypeResolver, //
    UsagetypeService,
  ],
})
export class UsagetypeModule {}
