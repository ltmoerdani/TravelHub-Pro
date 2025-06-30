import { Module } from '@nestjs/common';
import { UmrohService } from './umroh.service';
import { UmrohController } from './umroh.controller';

@Module({
  providers: [UmrohService],
  controllers: [UmrohController],
  exports: [UmrohService],
})
export class UmrohModule {}